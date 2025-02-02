import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Loading from "./Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";


const JoinModal = ({ camp }) => {

    const { _id, title, location, hpName, fee } = camp;
    const { user, loading, userRegisteredCamps, setUserRegisteredCamps } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [uploading, setUploading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleJoinCamp = async data => {
        setUploading(true);
        const { title, fee, location, hpName, participant_Name, participant_Email, age, gender, phoneNumber, emergencyContact } = data;
        const registeredCamp = {
            campId: _id,
            campName: title,
            fee,
            location,
            hpName,participant_Name,
            participant_Email,
            age: parseInt(age),
            gender,
            phoneNumber,
            emergencyContact
        };
        const res = await axiosSecure.post('/registered-camps', registeredCamp);
        if (res.data.insertedId) {
            setUserRegisteredCamps([...userRegisteredCamps,registeredCamp]);
            setUploading(false);
            document.getElementById(`${_id}`).close();
            toast.success(`Successfully Registered in ${title}`, {
                position: "top-center",
                autoClose: 2000
            })
        }
    }

    if (loading) return <Loading></Loading>;

    return (
        <dialog id={_id} className="w-11/12 mx-auto max-h-[95vh] overflow-scroll bg-white dark:bg-black text-black dark:text-white z-20">
            <div className="w-10/12 mx-auto my-8 border rounded-xl p-2 sm:p-8">
                <form onSubmit={handleSubmit(handleJoinCamp)} className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Camp Name</span>
                            </label>
                            <input defaultValue={title} readOnly type="text" placeholder="Camp Name" {...register("title", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Camp Fees</span>
                            </label>
                            <input defaultValue={fee} readOnly type="number" placeholder="Amount" {...register("fee", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Location</span>
                            </label>
                            <input defaultValue={location} readOnly type="text" placeholder="Location" {...register("location", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Healthcare Professional</span>
                            </label>
                            <input defaultValue={hpName} readOnly type="text" placeholder="Dr. Jane Doe" {...register("hpName", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Participant Name</span>
                            </label>
                            <input defaultValue={user?.displayName} readOnly type="text" placeholder="Your Name" {...register("participant_Name", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Participant Email</span>
                            </label>
                            <input defaultValue={user?.email} readOnly type="email" placeholder="Your Email" {...register("participant_Email", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Age</span>
                            </label>
                            <input type="number" placeholder="Patient's Age" {...register("age", { required: true, min: 1 })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" min={1} />
                            {errors.age?.type === 'required' && <span className="text-red-600">Please provide Patient's age</span>}
                            {errors.age?.type === 'min' && <span className="text-red-600">Age can't be less than 1</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Phone Number</span>
                            </label>
                            <input type="tel" placeholder="Your mobile number" {...register("phoneNumber", { required: true, pattern: /^[0-9]{11}$/ })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                            {errors.phoneNumber?.type === 'require' && <span className="text-red-600">Please provide your mobile number</span>}
                            {errors.phoneNumber?.type === 'pattern' && <span className="text-red-600">Invalid mobile number</span>}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Gender</span>
                            </label>
                            <select {...register("gender", { required: true })} className="w-full h-10 rounded-lg px-4 border bg-black dark:bg-white text-white dark:text-black">
                                <option value="" disabled selected hidden>Select Patient's Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender?.type === "required" && <span className="text-red-600">Please select patient's gender</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Emergency Contact</span>
                            </label>
                            <input type="tel" placeholder="Emergency mobile number" {...register("emergencyContact", { required: true, pattern: /^[0-9]{11}$/ })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                            {errors.emergencyContact?.type === 'require' && <span className="text-red-600">Please provide an emergency contact (mobile)</span>}
                            {errors.emergencyContact?.type === 'pattern' && <span className="text-red-600">Invalid mobile number</span>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn w-full h-12 mt-4 rounded-lg bg-green-500 text-white text-lg outline-none border-none hover:bg-green-500 hover:scale-105">
                        {uploading ? <span className="loading loading-spinner loading-md"></span> : "Join Camp"}
                    </button>
                </form>
                <div className="modal-action justify-center">
                    <form method="dialog" className="w-full">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn w-full text-white hover:bg-gray-400">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default JoinModal;