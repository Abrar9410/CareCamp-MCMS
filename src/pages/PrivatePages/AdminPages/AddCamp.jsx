import moment from "moment";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { MdDateRange } from "react-icons/md";
import { uploadImage } from "../../../utilities/utilities";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Heading from "../../../components/shared/Heading";


const AddCamp = () => {

    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [uploading, setUploading] = useState(false)
    const axiosSecure = useAxiosSecure();

    const handleAddCamp = async data => {
        setErrorMessage('');
        setUploading(true);
        const {title, image, location, schedule, fee, hpName, description} = data;
        // console.log(title, image[0], location, , fee, hpName, description);
        const date = moment(schedule).format('DD/MM/YYYY hh:mm A').slice(0,10);
        const time = moment(schedule).format('DD/MM/YYYY hh:mm A').slice(11, 19);
        const img = image[0];
        const thumbnail = await uploadImage(img);
        const camp = {
            title,
            thumbnail,
            location,
            date,
            time,
            fee: parseInt(fee),
            hpName,
            description
        }
        const res = await axiosSecure.post('/camps', camp);
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "New Camp has been added!",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            setUploading(false);
        }
    }

    return (
        <>
            <Helmet><title>Add Camp | CareCamp</title></Helmet>
            <Heading title="Organize NEW Medical Camp"></Heading>
            <div className="p-2 min-[300px]:p-4 min-[450px]:p-6 sm:p-8 bg-slate-100 dark:bg-black 2xl:w-11/12 mx-auto shadow-lg">
                <form onSubmit={handleSubmit(handleAddCamp)} className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Title</span>
                            </label>
                            <input type="text" placeholder="Camp Name" {...register("title", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                            {errors.name?.type === 'required' && <span className="text-red-600">You forgot to provide Title</span>}
                        </div>
                        <div className="form-control">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Thumbnail</span>
                            </label>
                            <input type="file" {...register("image", { required: true })} className="h-10 text-black dark:text-white" accept="image/*" />
                            {errors.image?.type === 'required' && <span className="text-red-600">Please provide a Thumbnail</span>}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Location</span>
                            </label>
                            <input type="text" placeholder="Location" {...register("location", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                            {errors.location?.type === 'required' && <span className="text-red-600">You forgot to provide Location</span>}
                        </div>
                        <div className="form-control w-full relative">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Date & Time</span>
                            </label>
                            <input id="datetime-input" aria-label="Date and time" type="datetime-local" {...register("schedule", {required: true})} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                            <MdDateRange onClick={() => document.getElementById('datetime-input').showPicker()} className="absolute right-3 top-[52px] text-white dark:text-black cursor-pointer"/>
                            {errors.schedule?.type === 'required' && <span className="text-red-600">You forgot to mention Schedule</span>}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Fee</span>
                            </label>
                            <input type="number" placeholder="Amount" {...register("fee", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" min={0}/>
                            {errors.fee?.type === 'required' && <span className="text-red-600">You forgot to mention the Fee</span>}
                        </div>
                        <div className="form-control w-full">
                            <label className="label text-black dark:text-white">
                                <span className="font-semibold">Healthcare Professional</span>
                            </label>
                            <input type="text" placeholder="Name" {...register("hpName", { required: true })} className="input input-bordered h-10 w-full bg-black dark:bg-white text-white dark:text-black" />
                            {errors.hpName?.type === 'required' && <span className="text-red-600">Please mention the name of Healthcare Professional</span>}
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label text-black dark:text-white">
                            <span className="font-semibold">Description</span>
                        </label>
                        <textarea
                            placeholder="Write details"
                            {...register("description", {required: true})}
                            className="textarea textarea-bordered textarea-md w-full bg-black dark:bg-white text-white dark:text-black"></textarea>
                        {errors.location?.type === 'required' && <span className="text-red-600">Please put some detail information</span>}    
                    </div>
                    <div className="form-control gap-4 mt-4 items-center">
                        <p className="text-red-600">{errorMessage}</p>
                        <button className="btn w-full bg-green-500 text-white lg:text-lg hover:bg-green-500 hover:scale-105 outline-none border-none">
                            {
                                uploading?
                                    <span className="loading loading-spinner loading-md"></span>:
                                    <span>Add Camp</span>    
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddCamp;