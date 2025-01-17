import googleLogo from "../../assets/Google_logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";


const Register = () => {

    const { setUser, setLoading, loginWithGoogle, createAccount, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        setErrorMessage('');
        if (password.length<6) {
            setErrorMessage('Password must be at least 6 characters');
            return;
        };
        const validPassword = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
        if (!validPassword.test(password)) {
            setErrorMessage('Password must contain at least one uppercase letter and one lowercase letter');
            return;
        }

        createAccount(email, password)
            .then(result => {
                setUser(result.user);
                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateUserProfile(profile)
                    .then(() => navigate("/"))
                    .catch(error => setErrorMessage(error.message));
                toast.success("Registration Successful!!!",{
                    position: "top-center"
                });
                setLoading(false);
            })
            .catch(error => setErrorMessage(error.message));
    }

    const handleGoogleLogin = () => {
        setErrorMessage('');
        loginWithGoogle()
            .then(result => {
                setUser(result.user);
            })
            .catch(error => setErrorMessage(error.message));
    }

    const handleShowPassword = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <div className="w-10/12 sm:w-2/3 xl:w-1/3 mx-auto border border-base-200 p-8 bg-white rounded-lg shadow-xl mb-8">
                <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold">Register Your Account</h2>
                <hr className="my-4" />
                <form onSubmit={handleRegister} className="px-5 flex flex-col gap-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="font-semibold">Name</span>
                        </label>
                        <input type="text" placeholder="name" name="name" className="input input-bordered h-10" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="font-semibold">Photo URL</span>
                        </label>
                        <input type="text" placeholder="photo url" name="photo" className="input input-bordered h-10" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="font-semibold">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered h-10" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="font-semibold">Password</span>
                        </label>
                        <input type={showPassword ? "text" : "password"} placeholder="password" name="password" className="input input-bordered h-10" required />
                        <button onClick={handleShowPassword} className="absolute right-3 bottom-3">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="checkbox checkbox-xs outline-none" required/>
                        <p className="text-sm">Accept our <Link>Terms & Conditions</Link></p>
                    </div>
                    <div className="form-control gap-4 mt-4 items-center">
                        <p className="text-red-600">{errorMessage}</p>
                        <button className="btn btn-primary w-full">Register</button>
                        <p className="text-center">Already Have an Account? <Link to="/login" className="text-blue-500">Login</Link></p>
                        <p onClick={handleGoogleLogin} className="cursor-pointer hover:scale-105 py-1 px-2 rounded-lg flex justify-center items-center gap-1 bg-[#575757] text-white w-max">
                            <img src={googleLogo} className="w-3 h-3" alt="Google-logo" />
                            <span className="text-xs">Sign up with Google</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;