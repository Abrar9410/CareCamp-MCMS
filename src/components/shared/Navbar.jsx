import logo from "../../assets/CareCamp_logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ThemeToggler from "./ThemeToggler";


const Navbar = () => {

    const {user, logOut} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = <>
        <li><NavLink to="/" className={({isActive})=>isActive? "text-primary font-semibold": "hover:text-primary"}>Home</NavLink></li>
        <li><NavLink to="/camps" className={({isActive})=>isActive? "text-primary font-semibold": "hover:text-primary"}>Available Camps</NavLink></li>
        <li><NavLink to="/contact" className={({isActive})=>isActive? "text-primary font-semibold": "hover:text-primary"}>Contact</NavLink></li>
    </>

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut();
            }
        });
    }

    return (
        <div className="sticky top-0 z-10 bg-opacity-30 backdrop-blur-md py-2 sm:py-4 shadow-md">
            <div className="w-11/12 md:w-10/12 mx-auto flex justify-between max-[249px]:items-start items-center">
                <div className="flex items-center gap-1 min-[400px]:gap-2 sm:gap-3">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn-ghost md:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content bg-black text-white rounded-box z-[1] mt-2 w-max p-2 space-y-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="logo" className="w-4 min-[275px]:w-6 min-[400px]:w-8 sm:w-10 lg:w-12 xl:w-14"/>
                        <span className="font-poppins text-primary max-[275px]:text-sm min-[400px]:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">CareCamp</span>
                    </Link>
                </div>
                <div className={`hidden ${location.pathname === '/login' || location.pathname === '/signup' ? 'md:hidden' : 'md:contents'}`}>
                    <ul className="flex justify-center items-center gap-3 lg:gap-4 xl:text-lg text-black dark:text-white">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex max-[249px]:flex-col-reverse justify-end items-center gap-1 sm:gap-2 lg:gap-3 xl:gap-4">
                    <ThemeToggler></ThemeToggler>
                    {
                        user?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="w-6 min-[300px]:w-8 sm:w-10 rounded-full">
                                    <img src={user.photoURL} alt="user" className="w-full"/>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-max p-2 space-y-2 flex items-center shadow">
                                    <li>
                                        {user?.displayName}
                                    </li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><button onClick={handleLogOut} className="w-full bg-red-600 text-white">Logout</button></li>
                                </ul>
                            </div>:
                            <button
                                onClick={()=>navigate("/login")}
                                hidden={location.pathname === '/login' || location.pathname === '/signup'}
                                className="bg-primary text-white text-xs min-[300px]:text-sm sm:text-base xl:text-lg w-max px-2 min-[320px]:py-1 min-[400px]:px-3 sm:px-4 sm:py-2 lg:px-5 xl:py-3 sm:font-semibold rounded-xl shadow-md hover:scale-105 outline-none">
                                Join Us
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;