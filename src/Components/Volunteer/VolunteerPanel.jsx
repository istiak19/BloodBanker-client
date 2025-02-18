import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdContentPaste, MdOutlineBloodtype } from "react-icons/md";
import { NavLink } from "react-router-dom";

const VolunteerPanel = () => {
    return (
        <div className="*:text-white">
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/dashboard/volunteerHome'> <FaHome></FaHome>Volunteer Home</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/dashboard/profile'> <CgProfile />Profile</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/dashboard/all-blood-donation-request'><MdOutlineBloodtype /> My Donation</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/dashboard/content-management'><MdContentPaste />  Content Management</NavLink></li>
        </div>
    );
};

export default VolunteerPanel;