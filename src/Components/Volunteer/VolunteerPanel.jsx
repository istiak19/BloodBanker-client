import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdContentPaste, MdOutlineBloodtype } from "react-icons/md";
import { NavLink } from "react-router-dom";

const VolunteerPanel = () => {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 p-3 duration-300 ${isActive
            ? 'hover:!bg-transparent !text-black font-semibold'
            : '!text-white hover:!bg-transparent hover:!text-gray-300'
        }`;

    return (
        <ul className="space-y-2 text-white">
            <li>
                <NavLink
                    to="/dashboard/volunteerHome"
                    className={linkClass}
                >
                    <FaHome />
                    Volunteer Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/dashboard/profile"
                    className={linkClass}
                >
                    <CgProfile />
                    Profile
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/dashboard/all-blood-donation-request"
                    className={linkClass}
                >
                    <MdOutlineBloodtype />
                    My Donations
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/dashboard/content-management"
                    className={linkClass}
                >
                    <MdContentPaste />
                    Manage Blogs
                </NavLink>
            </li>
        </ul>
    );
};

export default VolunteerPanel;