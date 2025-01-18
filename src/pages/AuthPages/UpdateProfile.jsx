import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const UpdateProfile = () => {

    const { user, updateUserProfile, setLoading } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleUpdateProfile = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        setErrorMessage('');
        const profile = {
            displayName: name,
            photoURL: photo
        };
        updateUserProfile(profile)
            .then(() => {
                setLoading(false);
                navigate("/user-profile");
            })
            .catch(error => setErrorMessage(error.message));
        toast.success("Profile Updated Successfully!!!", {
            position: "top-center"
        });
    }

    return (
        <div className="w-10/12 sm:w-2/3 xl:w-1/3 mx-auto border border-base-200 p-8 bg-white rounded-lg shadow-xl my-16">
            <form onSubmit={handleUpdateProfile} className="px-5 flex flex-col gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="font-semibold">Edit Username:</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={user && user.displayName}
                        className="input input-bordered input-md" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="font-semibold">Edit Photo URL:</span>
                    </label>
                    <input
                        type="text"
                        name="photo"
                        defaultValue={user && user.photoURL}
                        className="input input-bordered input-md" required />
                </div>
                <p className="text-red-600">{errorMessage}</p>
                <input type="submit" value="Update Profile" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default UpdateProfile;