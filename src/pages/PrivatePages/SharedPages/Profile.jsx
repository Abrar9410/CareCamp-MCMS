import useAuth from "../../../hooks/useAuth";


const Profile = () => {

    const {user} = useAuth();
    const {photoURL: photo, displayName: name, email} = user;

    return (
        <div className="max-[215px]:min-h-[calc(100vh-120px)] min-[216px]:min-h-[calc(100vh-80px)] min-[300px]:min-h-[calc(100vh-68px)] min-[350px]:min-h-[calc(100vh-72px)] min-[400px]:min-h-[calc(100vh-88px)]  sm:min-h-[calc(100vh-112px)] flex flex-col justify-center items-center">
            <div className="w-max mx-auto font-bold">
                <h2 className="w-max text-center text-primary text-3xl">Welcome, {name.split(' ')[0]}!</h2>
            </div>
            <div className="w-full min-[400px]:w-11/12 sm:w-1/2 mx-auto flex flex-col justify-center items-center gap-8 p-8 border-2 border-primary rounded-lg shadow-xl bg-white">
                <div className="w-36 h-36 mx-auto border-2 border-gray-200">
                    <img src={photo} alt="user_img" className="w-full h-full"/>
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex flex-col items-center lg:text-xl">
                        <p className="w-max text-center text-black/70">Name</p>
                        <p className="w-max text-center text-black font-semibold">{name}</p>
                    </div>
                    <div className="flex flex-col items-center lg:text-xl">
                        <p className="w-max text-center text-black/70">Email</p>
                        <p className="w-max text-center text-black font-semibold">{email}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <button className="w-max px-3 py-1 bg-green-500 text-white rounded-xl outline-none hover:scale-105">
                        Update Profile
                    </button>
                    <button className="w-max px-3 py-1 bg-green-500 text-white rounded-xl outline-none hover:scale-105">
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;