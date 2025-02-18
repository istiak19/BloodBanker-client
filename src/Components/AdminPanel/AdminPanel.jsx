import { FaHome, FaUsers } from "react-icons/fa";
import { MdContentPaste, MdOutlineBloodtype } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const AdminPanel = () => {
    return (
        <div className="*:text-white">
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/dashboard/AdminHome'> <FaHome></FaHome>Admin Home</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/dashboard/profile'> <CgProfile />Profile</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/dashboard/all-users'> <FaUsers />All Users</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/dashboard/all-blood-donation-request'><MdOutlineBloodtype /> All Blood Donation</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/dashboard/content-management'><MdContentPaste /> Content Management</NavLink></li>
        </div>
    );
};

export default AdminPanel;