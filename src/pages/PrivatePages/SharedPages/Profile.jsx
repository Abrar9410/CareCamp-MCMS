import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Heading from "../../../components/shared/Heading";
import { toast } from "react-toastify";


const Profile = () => {

    const { user, setUserEmail } = useAuth();
    const { photoURL: photo, displayName: name, email } = user;
    const navigate = useNavigate();

    const handleResetPassword = () => {
        // setUserEmail(user.email);
        // navigate('/reset-password');
        toast.error('This functionality is currently disabled to let users use Demo credentials for the time being!', {
            position: "top-center",
            autoClose: 3000
        });
    }

    return (
        <>
            <Helmet><title>Profile | CareCamp</title></Helmet>
            <Heading title={`Welcome, ${name.split(' ')[0]}!`}></Heading>
            <div className="max-[215px]:min-h-[calc(100vh-300px)] min-[216px]:min-h-[calc(100vh-200px)] min-[300px]:min-h-[calc(100vh-220px)] min-[350px]:min-h-[calc(100vh-266px)] min-[400px]:min-h-[calc(100vh-276px)]  sm:min-h-[calc(100vh-300px)] xl:min-h-[calc(100vh-370px)] flex flex-col justify-center items-center">
                <div className="w-full min-[400px]:w-11/12 sm:w-10/12 md:w-2/3 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto flex flex-col justify-center items-center gap-3 min-[300px]:gap-5 sm:gap-10 p-2 min-[300px]:p-4 min-[450px]:p-6 sm:p-8 border-2 border-primary rounded-lg shadow-xl bg-primary/5 dark:bg-black">
                    <div className="w-14 h-14 min-[200px]:w-16 min-[200px]:h-16 min-[300px]:w-20 min-[300px]:h-20 min-[400px]:w-24 min-[400px]:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 2xl:w-40 2xl:h-40 mx-auto border-2 border-primary rounded-lg shadow-lg bg-white">
                        <img src={photo} alt="user_img" className="w-full h-full" />
                    </div>
                    <div className="w-full flex flex-col gap-2 min-[300px]:gap-3 sm:gap-0 sm:flex-row justify-between items-center">
                        <div className="flex flex-col items-center text-xs min-[200px]:text-sm min-[300px]:text-base sm:text-lg lg:text-xl">
                            <p className="w-max text-center text-black/70 dark:text-white/70">Name</p>
                            <p className="w-max text-center text-black dark:text-white font-semibold">{name}</p>
                        </div>
                        <div className="flex flex-col items-center text-xs min-[200px]:text-sm min-[300px]:text-base sm:text-lg lg:text-xl">
                            <p className="w-max text-center text-black/70 dark:text-white/70">Email</p>
                            <p className="w-max text-center text-black dark:text-white font-semibold">{email}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={() => navigate("/dashboard/profile/update-profile")}
                            className="w-max px-3 py-1 bg-green-500 text-white text-xs min-[200px]:text-sm min-[300px]:text-base rounded-xl outline-none hover:scale-105">
                            Update Profile
                        </button>
                        <button
                            onClick={handleResetPassword}
                            className="w-max px-3 py-1 bg-green-500 text-white text-xs min-[200px]:text-sm min-[300px]:text-base rounded-xl outline-none hover:scale-105">
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;