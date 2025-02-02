import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/shared/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {

    const {id:registrationId} = useParams();
    const axiosSecure = useAxiosSecure();
    const {data: campInfo = {}, isPending} = useQuery({
        queryKey: ["campInfo", registrationId],
        queryFn: async () => {
            const {data} = await axiosSecure(`/user-registered-camp/${registrationId}`);
            return data;
        }
    })

    if(isPending) return <Loading></Loading>;

    return (
        <div className="w-full sm:w-3/4 xl:w-2/3 mx-auto my-4 min-[400px]:my-6 sm:my-8 md:my-10">
            <p className="text-primary text-lg font-semibold my-4">Amount: BDT {campInfo.fee}</p>
            <Elements stripe={stripePromise}>
                <CheckoutForm campInfo={campInfo}></CheckoutForm>
            </Elements>
            <p className="text-center text-black dark:text-white text-xl font-semibold mt-8">
                After payment please keep an eye on the Confirmation Status! Please consider providing your
                Feedback to inspire us.
            </p>
        </div>
    );
};

export default Payment;