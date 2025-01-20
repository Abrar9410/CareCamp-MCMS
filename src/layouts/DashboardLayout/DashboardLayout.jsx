import { GiHamburgerMenu } from "react-icons/gi";
import ThemeToggler from "../../components/shared/ThemeToggler";
import { NavLink } from "react-router-dom";


const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content w-11/12 mx-auto pt-[52.25px] min-[250px]:pt-[38px] min-[276px]:pt-10 min-[300px]:pt-[43px] sm:pt-[65.75px] lg:pt-[72.5px] xl:pt-[79.25px]">
                {/* Page content here */}
                <div className="flex max-[249px]:flex-col-reverse justify-end items-center gap-1 sm:gap-2 lg:gap-3 xl:gap-4">
                    <ThemeToggler></ThemeToggler>
                    <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                        <GiHamburgerMenu className="min-[300px]:text-lg min-[350px]:text-xl sm:text-2xl"/>
                    </label>
                </div>
                <p>HELLO DASHBOARD</p>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="bg-black text-white min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <NavLink>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            Add a Camp
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            Manage Camps
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            Manage Registered Camps
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            Manage Participants
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            Registered Camps
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            Analytics
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;