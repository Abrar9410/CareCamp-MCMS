import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";


const MainLayout = () => {
    return (
        <>
        <Navbar></Navbar>
        <div>
            <Outlet></Outlet>    
        </div>  
        </>
    );
};

export default MainLayout;