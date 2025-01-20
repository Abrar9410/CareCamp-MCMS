import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";


const MainLayout = () => {
    return (
        <>
        <Navbar></Navbar>
        <div className="min-h-[calc(100vh-432px)]">
            <Outlet></Outlet>    
        </div>
        <Footer></Footer>  
        </>
    );
};

export default MainLayout;