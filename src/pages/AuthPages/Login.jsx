import googleLogo from "../../assets/Google_logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {

    const { setUser, loginWithGoogle, loginWithEmailAndPassword, setUserEmail } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef();
    
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setErrorMessage('');
        loginWithEmailAndPassword(email, password)
            .then(result => {
                setUser(result.user);
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => setErrorMessage(error.message));
    }

    const handleGoogleLogin = () => {
        setErrorMessage('');
        loginWithGoogle()
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

    const handleForgotPassword = () => {
        setUserEmail(emailRef.current.value);
        navigate("/reset-password");
    }

    return (
        <div className="">
            <div className="w-10/12 sm:w-2/3 xl:w-1/3 mx-auto border border-base-200 p-8 bg-white rounded-lg shadow-xl my-8">
                <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold">Login to Your Account</h2>
                <hr className="my-4"/>
                <form onSubmit={handleLogin} className="px-5 flex flex-col gap-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="font-semibold">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered h-10" ref={emailRef} required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="font-semibold">Password</span>
                        </label>
                        <input type={showPassword ? "text" : "password"} placeholder="password" name="password" className="input input-bordered h-10" required />
                        <button onClick={handleShowPassword} className="absolute right-3 max-[249px]:bottom-14 bottom-11">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <label onClick={handleForgotPassword} className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control gap-4 mt-4 items-center">
                        <p className="text-red-600">{errorMessage}</p>
                        <button className="btn btn-primary w-full">Login</button>
                        <p className="text-center">Don't Have an Account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
                        <p onClick={handleGoogleLogin} className="cursor-pointer hover:scale-105 py-1 px-2 rounded-lg flex justify-center items-center gap-1 bg-[#575757] text-white w-max">
                            <img src={googleLogo} className="w-3 h-3" alt="Google-logo" />
                            <span className="text-xs">Sign in with Google</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;