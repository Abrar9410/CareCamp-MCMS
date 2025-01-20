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
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage></ErrorPage>,
    }
])

export default Router;