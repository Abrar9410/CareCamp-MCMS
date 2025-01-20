import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { axiosPublic, uploadImage } from "../../utilities/utilities";
import GoogleLogin from "./GoogleLogin";


const SignUp = () => {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const { setUser, setLoading, createAccount, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const handleSignUp = async data => {
        setErrorMessage('');
        const {name, image, email, password} = data;
        const img = image[0];
        const photoURL = await uploadImage(img);

        createAccount(email, password)
            .then(result => {
                setUser(result.user);
                const profile = {
                    displayName: name,
                    photoURL
                }
                updateUserProfile(profile)
                    .then(async () => {
                        const userInfo = {
                            name,
                            email
                        };
                        const {data} = await axiosPublic.post('/users', userInfo);
                        if (data.message || data) {
                            console.log(data.message);
                            console.log(data);
                            toast.success("Registration Successful!!!", {
                                position: "top-center"
                            });
                            setLoading(false);
                            navigate("/")
                        }
                    })
                    .catch(error => setErrorMessage(error.message));
            })
            .catch(error => {
                setErrorMessage(error.message);
                setLoading(false);
            });
    }

    const handleShowPassword = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <>
        <Helmet><title>CareCamp | Sign Up</title></Helmet>
        <div>
            <div className="w-10/12 sm:w-2/3 xl:w-1/3 mx-auto border border-black dark:border-white p-8 bg-white dark:bg-black rounded-lg shadow-xl my-8">
                <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold font-poppins text-black dark:text-white">Sign Up</h2>
                <p className="text-center text-sm mt-2 text-primary dark:text-blue-500">Welcome to CampCare</p>
                <hr className="my-4" />
                <form onSubmit={handleSubmit(handleSignUp)} className="px-5 flex flex-col gap-2">
                    <div className="form-control">
                            <label className="label text-black dark:text-white">
                            <span className="font-semibold">Name</span>
                        </label>
                        <input type="text" placeholder="name" {...register("name", {required:true})} className="input input-bordered h-10 bg-black dark:bg-white text-white dark:text-black"/>
                        {errors.name?.type==='required'&& <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                                <span className="font-semibold text-black dark:text-white">Select Image:</span>
                        </label>
                        <input type="file" {...register("image")} className="text-black dark:text-white" accept="image/*" required/>
                    </div>
                    <div className="form-control">
                            <label className="label text-black dark:text-white">
                            <span className="font-semibold">Email</span>
                        </label>
                        <input type="email" placeholder="email" {...register("email", {required:true})} className="input input-bordered h-10 bg-black dark:bg-white text-white dark:text-black"/>
                        {errors.email?.type==='required'&& <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="form-control relative">
                            <label className="label text-black dark:text-white">
                            <span className="font-semibold">Password</span>
                        </label>
                        <input type={showPassword ? "text" : "password"} placeholder="password" {...register("password", { required: true, minLength: 6, pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/})} className="input input-bordered h-10 bg-black dark:bg-white text-white dark:text-black"/>
                        {errors.password?.type==='required'&& <span className="text-red-600">Password is required</span>}
                        {errors.password?.type==='minLength'&& <span className="text-red-600">Password must contain at least 6 characters</span>}
                        {errors.password?.type === 'pattern' && <span className="text-red-600">Password must include lowercase, uppercase, and a digit</span>}
                        <button onClick={handleShowPassword} className="absolute right-3 top-[52px]">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="checkbox checkbox-xs outline-none border-black dark:border-white" required/>
                        <p className="text-sm text-black dark:text-white">Accept our <Link to="/terms-of-service">Terms & Conditions</Link></p>
                    </div>
                    <div className="form-control gap-4 mt-4 items-center">
                        <p className="text-red-600">{errorMessage}</p>
                        <button className="btn btn-primary w-full bg-primary text-white lg:text-lg">Sign Up</button>
                        <p className="text-center text-black dark:text-white">Already Have an Account? <Link to="/login" className="text-blue-500">Login</Link></p>
                        <GoogleLogin setErrorMessage={setErrorMessage}></GoogleLogin>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default SignUp;