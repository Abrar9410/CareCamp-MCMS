import logo from "../../assets/CareCamp_logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import ThemeToggler from "./ThemeToggler";


const Navbar = () => {

    const {user, logOut} = useAuth();
    const navigate = useNavigate();

    const navLinks = <>
        <li><NavLink to="/" className={({isActive})=>isActive? "text-primary font-semibold": ""}>Home</NavLink></li>
        <li><NavLink to="/camps" className={({isActive})=>isActive? "text-primary font-semibold": ""}>Available Camps</NavLink></li>
        <li><NavLink to="/" className={({isActive})=>isActive? "text-primary font-semibold": ""}>Contact</NavLink></li>
    </>

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut();
            }
        });
    }

    return (
        <div className="sticky top-0 z-10 bg-opacity-30 backdrop-blur-md py-4">
            <div className="w-11/12 md:w-10/12 mx-auto flex justify-between items-center">
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
                            className="dropdown-content bg-black text-white rounded-box z-[1] mt-2 w-max p-3 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="logo" className="w-4 min-[275px]:w-6 min-[400px]:w-8 sm:w-10 lg:w-12"/>
                        <span className="font-poppins text-primary max-[275px]:text-sm min-[400px]:text-lg sm:text-xl lg:text-2xl font-bold">CareCamp</span>
                    </Link>
                </div>
                <div className="hidden md:flex">
                    <ul className="flex justify-center items-center gap-3 lg:gap-4 text-black dark:text-white">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex justify-end items-center min-[255px]:gap-1 sm:gap-2">
                    <ThemeToggler></ThemeToggler>
                    {
                        user?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} alt="user" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-max p-2 shadow">
                                    <li>
                                        {user?.displayName}
                                    </li>
                                    <li><Link>Dashboard</Link></li>
                                    <li><button onClick={handleLogOut}>Logout</button></li>
                                </ul>
                            </div>:
                            <button
                                onClick={()=>navigate("/login")}
                                className="bg-primary text-white text-xs min-[300px]:text-sm sm:text-base w-max px-2 min-[320px]:py-1 min-[400px]:px-3 sm:px-4 sm:py-2 sm:font-semibold rounded-xl">
                                Join Us
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;