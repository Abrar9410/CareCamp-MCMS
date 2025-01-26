import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { axiosPublic } from "../utilities/utilities";


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    console.log(loading, user);
    const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches); //Temporary- For this app only

    // Google Sign-In
    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        setLoading(true);
        return (
            signInWithPopup(auth, googleProvider)
            // .then(result => setUser(result.user))
            // .catch(error => alert("ERROR", error.code))
        );
    }
    
    // Github Sign-In
    const githubProvider = new GithubAuthProvider();
    const loginWithGithub = () => {
        setLoading(true);
        return (
            signInWithPopup(auth, githubProvider)
            // .then(result => setUser(result.user))
            // .catch(error => alert("ERROR",error.code))
        );
    }

    // Email-Password Sign In
    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return (
            signInWithEmailAndPassword(auth, email, password)
            // .then(result => setUser(result.user))
            // .catch(error => console.log("Error", error.message))
        );
    }

    // Create/Register/Sign-Up New User with Email-Password
    const createAccount = (email, password) => {
        setLoading(true);
        return (
            createUserWithEmailAndPassword(auth, email, password)
            // .then(result => setUser(result.user))
            // .catch(error => console.log("Error", error.message))
        );
    }

    // Update User-Profile
    const updateUserProfile = (updateInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateInfo);
        // .then(() => {
            //     setLoading(false);
            //     navigate("/user-profile");
            // })         
        // .catch(error => setErrorMessage(error.message));
    }

    // Reset Password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
                // .then(() => {
                //      const link = "mail.google.com";
                //      window.open(`//${link}`, "_blank");
                //      logOut();
                //      setLoading(false);
                // })
                // .catch(error => console.log(error.message))
    }

    // Log-Out 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser);
            if (currentUser?.email) {
                const { data } = await axiosPublic.post('/jwt',
                    {
                        email: currentUser?.email,
                    },
                    { withCredentials: true }
                );
                setLoading(false);
            }
            else {
                await axiosPublic.get(
                    '/logout',
                    { withCredentials: true }
                )
                setLoading(false);
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        loginWithGoogle,
        loginWithGithub,
        loginWithEmailAndPassword,
        createAccount,
        loading,
        setLoading,
        updateUserProfile,
        userEmail,
        setUserEmail,
        resetPassword,
        logOut,
        isDarkMode, setIsDarkMode   //Temporary- For this app only
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;