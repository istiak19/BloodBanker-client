import { FaHome, FaUsers } from "react-icons/fa";
import { MdContentPaste, MdOutlineBloodtype } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const AdminPanel = () => {
    return (
        <div className="*:text-white">
            <li><NavLink to='/dashboard/profile'> <CgProfile />Profile</NavLink></li>
            <li><NavLink to='/dashboard/AdminHome'> <FaHome></FaHome>Admin Home</NavLink></li>
            <li><NavLink to='/dashboard/All-Users'> <FaUsers />All Users</NavLink></li>
            <li><NavLink to='/dashboard/BloodDonation'><MdOutlineBloodtype /> All Blood Donation</NavLink></li>
            <li><NavLink to='/dashboard/ContentManagement'><MdContentPaste /> Content Management</NavLink></li>
        </div>
    );
};

export default AdminPanel;