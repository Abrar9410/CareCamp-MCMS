import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../../utilities/utilities";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../components/shared/Heading";
import { Helmet } from "react-helmet-async";


const UpdateProfile = () => {

    const { user, updateUserProfile, setLoading } = useAuth();
    const { photoURL: photo, displayName: name, email } = user;
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const updateProfile = profile => {
        updateUserProfile(profile)
            .then(async () => {
                const { data } = await axiosSecure.patch(`/users/${email}`, profile);
                if (data.matchedCount > 0) {
                    setLoading(false);
                    toast.success("Profile Updated Successfully!!!", {
                        position: "top-center"
                    });
                    navigate("/dashboard/profile");
                }
            })
            .catch(error => setErrorMessage(error.message));
    }
    
    const handleUpdateProfile = async data => {
        setErrorMessage('');
        const {name, image} = data;
        const img = image[0] || null;
        if (img) {
            const imgURL = await uploadImage(img);
            const profile = {
                displayName: name,
                photoURL: imgURL
            };
            updateProfile(profile);
        }
        else {
            const profile = {
                displayName: name
            };
            updateProfile(profile);
        }
    }

    return (
        <>
            <Helmet><title>Update-Profile | CareCamp</title></Helmet>
            <Heading title="Update Your Profile"></Heading>
            <div className="max-[215px]:min-h-[calc(100vh-300px)] min-[216px]:min-h-[calc(100vh-200px)] min-[300px]:min-h-[calc(100vh-220px)] min-[350px]:min-h-[calc(100vh-266px)] min-[400px]:min-h-[calc(100vh-276px)]  sm:min-h-[calc(100vh-300px)] lg:min-h-[calc(100vh-320px)] flex flex-col justify-center items-center">
                <div className="w-full min-[400px]:w-11/12 sm:w-10/12 md:w-2/3 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto border border-base-200 p-1 min-[320px]:p-2 min-[360px]:p-3 min-[400px]:p-4 sm:p-8 bg-white dark:bg-black rounded-lg shadow-xl">
                <form onSubmit={handleSubmit(handleUpdateProfile)} className="flex flex-col gap-2 max-[319px]:text-sm">
                    <div className="form-control">
                        <label className="label text-black dark:text-white">
                            <span className="font-semibold">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            {...register("name", { required: true })}
                            className="input input-bordered h-10 bg-black dark:bg-white text-white dark:text-black max-[319px]:text-sm"
                            defaultValue={name} />
                        {errors.name?.type === 'required' && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                                <span className="font-semibold text-black dark:text-white">Select Image: (<span className="text-sm">if you want to change</span>)</span>
                        </label>
                        <input
                            type="file"
                            {...register("image")}
                            className="text-black dark:text-white"
                            accept="image/*" />
                    </div>
                    <div className="form-control">
                        <label className="label text-black dark:text-white">
                            <span className="font-semibold">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            {...register("email", { required: true })}
                            className="input input-bordered h-10 bg-black dark:bg-white text-white dark:text-black max-[319px]:text-sm"
                            value={email} />
                        {errors.email?.type === 'required' && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="form-control gap-4 mt-4 items-center">
                        <p className="text-red-600">{errorMessage}</p>
                        <input
                            type="submit"
                            value="Update Profile"
                            className="btn w-full bg-green-500 text-white lg:text-lg outline-none border-none hover:bg-green-500 hover:scale-105" />
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default UpdateProfile;