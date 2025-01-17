import { NavLink } from "react-router-dom";


const Navbar = () => {

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
    </>

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
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="hidden sm:flex">
                    <ul className="flex justify-center items-center gap-4">
                        {navLinks}
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default Navbar;