import { CgProfile } from 'react-icons/cg';
import { FaHome } from 'react-icons/fa';
import { MdOutlineBloodtype } from 'react-icons/md';
import { IoCreate } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const DonorPanel = () => {
    return (
        <div className="*:text-white">
            <li><NavLink to='/dashboard/donorHome'> <FaHome></FaHome>Donor Home</NavLink></li>
            <li><NavLink to='/dashboard/profile'> <CgProfile />Profile</NavLink></li>
            <li><NavLink to='/dashboard/my-donation-requests'><MdOutlineBloodtype /> My Donation</NavLink></li>
            <li><NavLink to='/dashboard/create-donation-request'><IoCreate /> Create Donation</NavLink></li>
        </div>
    );
};

export default DonorPanel;