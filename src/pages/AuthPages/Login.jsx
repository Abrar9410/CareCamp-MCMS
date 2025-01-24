import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import GoogleLogin from "./GoogleLogin";


const Login = () => {

    const { register, handleSubmit, formState: { errors }} = useForm();
    const { setUser, loginWithEmailAndPassword, setUserEmail } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    // const emailRef = useRef();
    
    const handleLogin = data => {
        const {email, password} = data;
        setErrorMessage('');
        loginWithEmailAndPassword(email, password)
            .then(result => {
                setUser(result.user);
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => setErrorMessage(error.message));
    }

    const handleShowPassword = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    // const handleForgotPassword = () => {
    //     setUserEmail(emailRef.current.value);
    //     navigate("/reset-password");
    //     // ref = { emailRef }; This line will go into email field
    // }

    return (
        <>
        <Helmet><title>CareCamp | Login</title></Helmet>
        <div className="">
                <div className="w-10/12 sm:w-2/3 xl:w-1/3 mx-auto border border-black dark:border-white p-8 bg-white dark:bg-black rounded-lg shadow-xl my-8">
                    <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white">Sign In</h2>
                <p className="text-center text-sm mt-2 text-primary dark:text-blue-500">Welcome Back!</p>
                <hr className="my-4"/>
                <form onSubmit={handleSubmit(handleLogin)} className="px-5 flex flex-col gap-2">
                    <div className="form-control">
                        <label className="label text-black dark:text-white">
                            <span className="font-semibold">Email</span>
                        </label>
                        <input type="email" placeholder="email" {...register("email", { required: true })} className="input input-bordered h-10 bg-black dark:bg-white text-white dark:text-black"/>
                        {errors.email?.type==='required'&& <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control relative">
                        <label className="label text-black dark:text-white">
                            <span className="font-semibold">Password</span>
                        </label>
                        <input type={showPassword ? "text" : "password"} placeholder="password" {...register("password", { required: true })} className="input input-bordered h-10 bg-black dark:bg-white text-white dark:text-black"/>
                        {errors.password?.type==='required'&& <span className="text-red-600">Enter your password</span>}
                        <button onClick={handleShowPassword} className="absolute right-3 max-[249px]:bottom-14 bottom-11">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control gap-4 mt-4 items-center">
                        <p className="text-red-600">{errorMessage}</p>
                        <button className="btn w-full bg-primary text-white lg:text-lg hover:bg-black dark:hover:bg-white dark:hover:text-primary outline-none">Sign In</button>
                        <p className="text-center text-black dark:text-white">Don't Have an Account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
                        <GoogleLogin setErrorMessage={setErrorMessage}></GoogleLogin>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default Login;