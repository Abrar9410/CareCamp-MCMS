import logo from "../../assets/CareCamp_logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import ThemeToggler from "../../components/shared/ThemeToggler";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaHistory, FaRegUserCircle } from "react-icons/fa";
import { FaHouseMedicalCircleCheck } from "react-icons/fa6";
import { RiHomeGearFill, RiLogoutCircleLine } from "react-icons/ri";
import { IoMdAnalytics } from "react-icons/io";
import { MdAddHome, MdManageAccounts } from "react-icons/md";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { IoSettingsSharp } from "react-icons/io5";


const DashboardLayout = () => {

    const { isAdmin } = useAdmin();
    const {logOut} = useAuth();

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
        <>
            <Helmet><title>CareCamp | Dashboard</title></Helmet>
            <Link to="/" className="flex items-center absolute left-8 top-2 sm:top-3 z-10 text-primary hover:text-white">
                <img src={logo} alt="logo" className="w-4 min-[275px]:w-6 min-[400px]:w-8 sm:w-10 lg:w-12 xl:w-14" />
                <span className="font-poppins max-[275px]:text-sm min-[400px]:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">CareCamp</span>
            </Link>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content w-11/12 mx-auto">
                    {/* Page content here */}
                    <div className="flex max-[215px]:flex-col-reverse justify-end max-[215px]:items-end items-center gap-2 lg:gap-3 xl:gap-4 py-3 min-[300px]:py-2 min-[400px]:py-3 sm:py-4">
                        <ThemeToggler></ThemeToggler>
                        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                            <GiHamburgerMenu className="min-[300px]:text-lg min-[350px]:text-xl sm:text-2xl" />
                        </label>
                    </div>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="bg-black text-white text-xs min-[276px]:text-sm min-[400px]:text-base lg:text-lg min-h-full w-max lg:w-80 px-2 lg:px-6 pt-14 min-[400px]:pt-16 sm:pt-20 lg:pt-24 xl:pt-28 pb-4 lg:pb-6 flex flex-col justify-between">
                        {/* Sidebar content here */}
                        <div className="space-y-5">
                            <li>
                                <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "flex items-center gap-2 text-primary bg-white px-2 rounded-md" : "flex items-center gap-2 hover:bg-primary px-2 rounded-md"}>
                                    <FaRegUserCircle />
                                    Profile
                                </NavLink>
                            </li>
                            {
                                isAdmin ?
                                    <>
                                        <li>
                                            <NavLink to="/dashboard/add-camp" className={({ isActive }) => isActive ? "flex items-center gap-2 text-primary bg-white px-2 rounded-md" : "flex items-center gap-2 hover:bg-primary px-2 rounded-md"}>
                                                <MdAddHome />
                                                Add a Camp
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/manage-camps" className={({ isActive }) => isActive ? "flex items-center gap-2 text-primary bg-white px-2 rounded-md" : "flex items-center gap-2 hover:bg-primary px-2 rounded-md"}>
                                                <IoSettingsSharp />
                                                Manage Camps
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/manage-registered-camps" className={({ isActive }) => isActive ? "flex items-center gap-2 text-primary bg-white px-2 rounded-md" : "flex items-center gap-2 hover:bg-primary px-2 rounded-md"}>
                                                <RiHomeGearFill />
                                                Manage Registered Camps
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/manage-participants" className={({ isActive }) => isActive ? "flex items-center gap-2 text-primary bg-white px-2 rounded-md" : "flex items-center gap-2 hover:bg-primary px-2 rounded-md"}>
                                                <MdManageAccounts />
                                                Manage Participants
                                            </NavLink>
                                        </li>
                                    </> :
                                    <>
                                        <li>
                                            <NavLink to="/dashboard/registered-camps" className={({ isActive }) => isActive ? "flex items-center gap-2 text-primary bg-white px-2 rounded-md" : "flex items-center gap-2 hover:bg-primary px-2 rounded-md"}>
                                                <FaHouseMedicalCircleCheck />
                                                Registered Camps
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/payment-history" className={({ isActive }) => isActive ? "flex items-center gap-2 text-primary bg-white px-2 rounded-md" : "flex items-center gap-2 hover:bg-primary px-2 rounded-md"}>
                                                <FaHistory />
                                                Payment History
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/analytics" className={({ isActive }) => isActive ? "flex items-center gap-2 text-primary bg-white px-2 rounded-md" : "flex items-center gap-2 hover:bg-primary px-2 rounded-md"}>
                                                <IoMdAnalytics />
                                                Analytics
                                            </NavLink>
                                        </li>
                                    </>
                            }
                        </div>
                        <li onClick={handleLogOut} className="w-max flex items-center gap-2 px-2 hover:text-red-600 cursor-pointer">
                            <RiLogoutCircleLine />
                            Log Out
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;