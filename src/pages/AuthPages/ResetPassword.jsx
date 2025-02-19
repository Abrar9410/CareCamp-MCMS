import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {

    const { userEmail, resetPassword, logOut, setLoading } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = e => {
        e.preventDefault();
        const email = e.target.email.value;
        setErrorMessage('');
        resetPassword(email)
            .then(() => {
                toast.info("Password reset email sent!");
                const link = "mail.google.com";
                window.open(`//${link}`, "_blank");
                logOut();
                setLoading(false);
                navigate("/login");
            })
            .catch(error => setErrorMessage(error.message));
    }

    return (
        <div className="w-10/12 sm:w-2/3 xl:w-1/3 mx-auto border border-black dark:border-white p-8 bg-white dark:bg-black rounded-lg shadow-xl my-16">
            <form onSubmit={handleResetPassword} className="px-5 flex flex-col gap-4">
                <div className="form-control">
                    <label className="label text-black dark:text-white">
                        <span className="font-semibold">Enter your registered Email:</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={userEmail}
                        className="input input-bordered input-md" required/>    
                </div>
                <p className="text-red-600">{errorMessage}</p>
                <input type="submit" value="Reset Password" className="btn w-full bg-gray-700 text-white lg:text-lg hover:bg-green-500 outline-none" />
            </form>
        </div>
    );
};

export default ResetPassword;