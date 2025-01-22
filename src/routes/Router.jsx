import { createBrowserRouter } from "react-router-dom";
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
                path: "/camps/:id",
                element: <AvailableCamps></AvailableCamps>
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
                path: "/dashboard",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
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
                element: <AddCamp></AddCamp>
            },
        ]
    }
])

export default Router;