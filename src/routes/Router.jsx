import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Login from "../pages/AuthPages/Login";
import SignUp from "../pages/AuthPages/SignUp";
import Home from "../pages/PublicPages/Home";
import AvailableCamps from "../pages/PublicPages/AvailableCamps";
import Contact from "../pages/PublicPages/Contact";
import TermsOfService from "../pages/PublicPages/TermsOfService";
import PrivacyPolicy from "../pages/PublicPages/PrivacyPolicy";
import CookiePolicy from "../pages/PublicPages/CookiePolicy";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Profile from "../pages/PrivatePages/SharedPages/Profile";
import AddCamp from "../pages/PrivatePages/AdminPages/AddCamp";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../pages/PrivatePages/SharedPages/UpdateProfile";
import AdminRoute from "./AdminRoute";
import ManageCamps from "../pages/PrivatePages/AdminPages/ManageCamps";
import UpdateCamp from "../pages/PrivatePages/AdminPages/UpdateCamp";
import Camp from "../pages/PublicPages/Camp";
import ManageRegisteredCamps from "../pages/PrivatePages/AdminPages/ManageRegisteredCamps";
import RegisteredCamps from "../pages/PrivatePages/ParticipantPages/RegisteredCamps";
import Payment from "../pages/PrivatePages/ParticipantPages/Payment";
import PaymentHistory from "../pages/PrivatePages/ParticipantPages/PaymentHistory";
import Analytics from "../pages/PrivatePages/ParticipantPages/Analytics";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/camps",
                element: <AvailableCamps></AvailableCamps>
            },
            {
                path: "/camp-details/:campId",
                element: <Camp></Camp>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/camps/${params.campId}`)
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/terms-of-service",
                element: <TermsOfService></TermsOfService>
            },
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy></PrivacyPolicy>
            },
            {
                path: "/cookie-policy",
                element: <CookiePolicy></CookiePolicy>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard/profile" replace></Navigate>
            },
            {
                path: "/dashboard/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "/dashboard/profile/update-profile",
                element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
            },
            {
                path: "/dashboard/add-camp",
                element: <AdminRoute><AddCamp></AddCamp></AdminRoute>
            },
            {
                path: "/dashboard/manage-camps",
                element: <AdminRoute><ManageCamps></ManageCamps></AdminRoute>
            },
            {
                path: "/dashboard/update-camp/:campId",
                element: <UpdateCamp></UpdateCamp>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/camps/${params.campId}`)
            },
            {
                path: "/dashboard/manage-registered-camps",
                element: <AdminRoute><ManageRegisteredCamps></ManageRegisteredCamps></AdminRoute>
            },
            {
                path: "/dashboard/registered-camps",
                element: <PrivateRoute><RegisteredCamps></RegisteredCamps></PrivateRoute>
            },
            {
                path: "/dashboard/payment/:id",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
            },
            {
                path: "/dashboard/payment-history",
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>,
            },
            {
                path: "/dashboard/analytics",
                element: <PrivateRoute><Analytics></Analytics></PrivateRoute>,
            },
        ]
    }
])

export default Router;