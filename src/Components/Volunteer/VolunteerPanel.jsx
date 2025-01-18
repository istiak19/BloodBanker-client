import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { MdOutlineBloodtype } from "react-icons/md";
import { NavLink } from "react-router-dom";

const VolunteerPanel = () => {
    return (
        <div>
            <li><NavLink to='/dashboard/volunteerHome'> <FaHome></FaHome>Volunteer Home</NavLink></li>
            <li><NavLink to='/dashboard/profile'> <CgProfile />Profile</NavLink></li>
            <li><NavLink to='/dashboard/all-blood-donation-request'><MdOutlineBloodtype /> My Donation</NavLink></li>
            <li><NavLink to='/dashboard/create-donation-request'><IoCreate /> Create Donation</NavLink></li>
        </div>
    );
};

export default VolunteerPanel;