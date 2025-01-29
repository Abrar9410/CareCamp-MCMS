import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/shared/Loading";


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
    const [inProgress, setInProgress] = useState(false);
    const { _id: id, campName, campId, location, hpName, participant_Name, age, gender, phoneNumber, emergencyContact, fee} = campInfo;
    
    const {user} = useAuth();
    const navigate = useNavigate();

    const handlePay = async e => {
        e.preventDefault();
        setInProgress(true);
        const payment = {
            registrationId: id,
            campId,
            registeredCampName: campName,
            location,
            hpName,
            participant_Name,
            email: user.email,
            age,
            gender,
            phoneNumber,
            emergencyContact,
        }
        const {data} = await axiosSecure.post(`/payment/${id}`, payment);
        try {
            if (data.insertedId) {
                setInProgress(false);
                toast.success('Payment Successful!!', {
                    position: "top-center",
                    autoClose: 1500
                });
                navigate('/dashboard/registered-camps');
            }
        } catch (error) {
            toast.error(`${error.message}`, {
                position: "top-center",
                autoClose: 5000
            })
        }
    }

    if(isPending) return <Loading></Loading>;

    return (
        <div>
            <form onSubmit={handlePay} className="w-full sm:w-2/3 md:w-1/2 xl:w-1/3 mx-auto flex flex-col items-center gap-2">
                <div className="form-control w-full">
                    <label className="label text-black dark:text-white">
                        <span className="font-semibold">Please pay the amount to get Registered</span>
                    </label>
                    <input type="number" placeholder="Amount" defaultValue={parseInt(fee)} readOnly className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" min={parseInt(fee)} max={parseInt(fee)} />
                </div>
                <button className="btn w-full bg-green-500 text-white lg:text-lg hover:bg-green-500 hover:scale-105 outline-none border-none">
                    {
                        inProgress ?
                            <span className="loading loading-spinner loading-md"></span> :
                            <span>Pay</span>
                    }
                </button>
            </form>
            <p className="text-center text-black dark:text-white text-xl font-semibold mt-8">
                After payment please keep an eye on the Confirmation Status! Please consider providing your
                Feedback to inspire us.
            </p>
        </div>
    );
};

export default Payment;