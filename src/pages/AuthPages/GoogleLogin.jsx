import { useLocation, useNavigate } from "react-router-dom";
import googleLogo from "../../assets/Google_logo.png";
import useAuth from "../../hooks/useAuth";
import { axiosPublic } from "../../utilities/utilities";

const GoogleLogin = ({setErrorMessage}) => {

    const { setUser, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogin = () => {
        setErrorMessage('');
        loginWithGoogle()
            .then(async result => {
                await setUser(result.user);
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                };
                const {data} = await axiosPublic.post('/users', userInfo);
                if (data.message || data.insertedId) {
                    navigate(location?.state ? location.state : "/");
                }
            })
            .catch(error => setErrorMessage(error.message));
    }

    return (
        <p onClick={handleGoogleLogin} className="cursor-pointer hover:scale-105 py-1 px-2 rounded-lg flex justify-center items-center gap-1 bg-[#575757] text-white w-max">
            <img src={googleLogo} className="w-3 h-3" alt="Google-logo" />
            <span className="text-xs">Sign up with Google</span>
        </p>
    );
};

export default GoogleLogin;