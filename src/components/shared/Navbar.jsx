import logo from "../../assets/CareCamp_logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const Navbar = () => {

    const {user, logOut} = useAuth();
    const navigate = useNavigate();

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/">Available Camps</NavLink></li>
        <li><NavLink to="/">Contact</NavLink></li>
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
        <div className="sticky top-0 z-10 bg-opacity-30 backdrop-blur-md py-2">
            <div className="w-11/12 sm:w-10/12 mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 sm:gap-0">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-max p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center gap-1">
                        <img src={logo} alt="logo" className="w-12"/>
                        <span className="text-2xl font-bold">CareCamp</span>
                    </Link>
                </div>
                <div className="hidden sm:flex">
                    <ul className="flex justify-center items-center gap-4">
                        {navLinks}
                    </ul>
                </div>
                <div className="flex justify-end items-center gap-2">
                    <div></div>
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
                            <button onClick={()=>navigate("/login")}>
                                Join Us
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;