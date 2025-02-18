import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { toast } from "react-toastify";

const CheckoutForm = ({campInfo}) => {

    const { _id: id, campName, campId, location, hpName, participant_Name, age, gender, phoneNumber, emergencyContact, fee, paymentStatus } = campInfo;
    const [inProgress, setInProgress] = useState(false);
    const { user, isDarkMode } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (fee>0) {
            axiosSecure.post('/create-payment-intent', {fee})
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [fee])

    const handlePay = async e => {
        e.preventDefault();
        setErrorMessage('');
        setInProgress(true);
        if (!stripe || !elements) {
            setInProgress(false);
            return setErrorMessage('An error occurred! Please try again.');
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            setInProgress(false);
            return setErrorMessage('An error occurred! Please try again.');
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            setInProgress(false);
            return setErrorMessage(error.message);
        }
        else {
            setErrorMessage('');
        }
        // Confirm Payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }
            }
        });
        if (confirmError) {
            setErrorMessage('Error occurred during confirm payment! Please try again.');
            return setInProgress(false);
        }
        else {
            if (paymentIntent.status === 'succeeded') {
                const date = new Date();
                const payment = {
                    transactionId: paymentIntent.id,
                    date_time: moment(date).format('DD/MM/YYYY hh:mm A'),
                    registrationId: id,
                    campId,
                    registeredCampName: campName,
                    location,
                    fee,
                    hpName,
                    participant_Name,
                    email: user.email,
                    age,
                    gender,
                    phoneNumber,
                    emergencyContact,
                }
                const { data } = await axiosSecure.post(`/payment/${id}`, payment);
                try {
                    if (data.insertedId) {
                        setInProgress(false);
                        toast.success(`Payment Successful!! Transaction ID: ${payment.transactionId}`, {
                            position: "top-center",
                            autoClose: 1500
                        });
                        navigate('/dashboard/registered-camps');
                    }
                } catch (error) {
                    toast.error(`${error.message}`, {
                        position: "top-center",
                        autoClose: 5000
                    });
                    setInProgress(false);
                }
            }
        }
    }

    if (paymentStatus==='Paid') return navigate('/dashboard/registered-camps');

    return (
        <form onSubmit={handlePay}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            backgroundColor: isDarkMode? 'black': 'white',
                            color: isDarkMode? 'white': 'black',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className="my-4 text-red-600">{errorMessage}</p>
            <button
                type="submit"
                disabled={!stripe || !elements || !clientSecret || inProgress}
                className="btn w-full bg-green-500 text-white lg:text-lg hover:bg-green-500 hover:scale-105 outline-none border-none"
            >
                {
                    inProgress ?
                        <span className="loading loading-spinner loading-md"></span> :
                        <span>Pay</span>
                }
            </button>
        </form>
    );
};

export default CheckoutForm;