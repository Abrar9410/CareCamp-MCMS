import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Login from "../pages/AuthPages/Login";
import SignUp from "../pages/AuthPages/SignUp";
import Home from "../pages/PublicPages/Home";
import AvailableCamps from "../pages/PublicPages/AvailableCamps";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
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
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
        ]
    }
])

export default Router;