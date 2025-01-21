import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/shared/Loading";


const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>;
    }
    if (user && user.email) {
        return children;
    }
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;