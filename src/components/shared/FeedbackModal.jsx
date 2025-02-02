import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { Controller, useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";


const FeedbackModal = ({campInfo}) => {

    const { _id, campName, campId, location, hpName, participant_Name, participant_Email, fee } = campInfo;
    const {register,handleSubmit,control,formState: { errors }} = useForm({
        mode: 'onBlur',
        defaultValues: {
            rating: 0,
            detailFeedback: ''
        }
    });
    const [uploading, setUploading] = useState(false)
    const axiosSecure = useAxiosSecure();

    const handleFeedback = async data => {
        setUploading(true);
        const {rating, detailFeedback} = data;
        const feedback = {
            campName,
            campId,
            hpName,
            location,
            fee,
            registrationId: _id,
            participant_Name,
            participant_Email,
            rating,
            detailFeedback
        };
        const {data: confirmedData} = await axiosSecure.post('/feedbacks', feedback);
        if (confirmedData.insertedId || confirmedData.modifiedCount > 0) {
            setUploading(false);
            document.getElementById(`${_id}${campId}`).close();
            Swal.fire({
                title: "Thanks for your Feedback!",
                icon: "success",
                confirmButtonColor: 'green'
            });
        }
    }

    return (
        <dialog id={_id+campId} className="w-11/12 sm:w-1/2 xl:w-1/3 mx-auto p-8 overflow-scroll bg-white dark:bg-black text-black dark:text-white z-20">
            <div className="flex flex-col items-center gap-2">
                <h4 className="text-black dark:text-white text-center font-poppins font-semibold sm:text-lg md:text-xl">Share your experience!</h4>
                <p className="max-sm:text-sm text-black dark:text-white text-center">Pease start by rating this camp.</p>
            </div>
            <form onSubmit={handleSubmit(handleFeedback)}>
                <div className="flex flex-col items-center">
                    <label className="label text-black dark:text-white text-lg">
                        <span className="font-semibold">Rating</span>
                    </label>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{
                            validate: (rating) => rating > 0,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Rating
                                style={{maxWidth: 180}}
                                value={value}
                                isRequired
                                onChange={onChange}
                                visibleLabelId="rating_label"
                                onBlur={onBlur}
                            />
                        )}
                    />
                    {errors.rating && <div className="text-red-600">Rating is required.</div>}
                </div>
                <div className="form-control">
                    <label className="label text-black dark:text-white text-lg">
                        <span className="font-semibold">Detail Feedback</span>
                    </label>
                    <textarea
                        placeholder="Say something"
                        {...register('detailFeedback', {required: true})}
                        className="textarea textarea-bordered textarea-md w-full"></textarea>
                    {errors.detailFeedback?.type==='required' && <span className="text-red-600">Please share your experience in a short detail.</span>}    
                </div>        
                <button
                    type="submit"
                    className="btn w-full h-12 mt-4 rounded-lg bg-green-500 text-white text-lg outline-none border-none hover:bg-green-500 hover:scale-105"
                >
                    {uploading ? <span className="loading loading-spinner loading-md"></span> : "Submit"}
                </button>
            </form>
            <div className="modal-action mt-2 justify-center">
                <form method="dialog" className="w-full">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn w-full text-white hover:bg-gray-400">Cancel</button>
                </form>
            </div>
        </dialog>
    );
};

export default FeedbackModal;