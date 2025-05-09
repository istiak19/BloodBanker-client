import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdContentPaste, MdOutlineBloodtype } from "react-icons/md";
import { NavLink } from "react-router-dom";

const VolunteerPanel = () => {
    return (
        <ul className="space-y-2 text-white">
            <li>
                <NavLink
                    to="/dashboard/volunteerHome"
                    className={({ isActive }) =>
                        isActive
                            ? "!text-black font-semibold !bg-transparent"
                            : "text-white flex items-center gap-2 transition duration-300 transform hover:scale-105 hover:bg-gray-800 hover:text-gray-300"
                    }
                >
                    <FaHome />
                    Volunteer Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                        isActive
                            ? "!text-black font-semibold !bg-transparent"
                            : "text-white flex items-center gap-2 transition duration-300 transform hover:scale-105 hover:bg-gray-800 hover:text-gray-300"
                    }
                >
                    <CgProfile />
                    Profile
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/dashboard/all-blood-donation-request"
                    className={({ isActive }) =>
                        isActive
                            ? "!text-black font-semibold !bg-transparent"
                            : "text-white flex items-center gap-2 transition duration-300 transform hover:scale-105 hover:bg-gray-800 hover:text-gray-300"
                    }
                >
                    <MdOutlineBloodtype />
                    My Donations
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/dashboard/content-management"
                    className={({ isActive }) =>
                        isActive
                            ? "!text-black font-semibold !bg-transparent"
                            : "text-white flex items-center gap-2 transition duration-300 transform hover:scale-105 hover:bg-gray-800 hover:text-gray-300"
                    }
                >
                    <MdContentPaste />
                    Manage Blogs
                </NavLink>
            </li>
        </ul>
    );
};

export default VolunteerPanel;