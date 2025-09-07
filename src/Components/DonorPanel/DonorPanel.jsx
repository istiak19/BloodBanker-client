import { CgProfile } from 'react-icons/cg';
import { FaHome } from 'react-icons/fa';
import { MdOutlineBloodtype } from 'react-icons/md';
import { IoCreate } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const DonorPanel = () => {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 p-3 duration-300 ${isActive
            ? 'hover:!bg-transparent !text-black font-semibold'
            : '!text-white hover:!bg-transparent hover:!text-gray-300'
        }`;

    return (
        <ul className="space-y-2">
            <li>
                <NavLink className={linkClass} to="/dashboard/donor-dashboard">
                    <FaHome size={20} />
                    <span>Donor Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink className={linkClass} to="/dashboard/profile">
                    <CgProfile size={20} />
                    <span>Profile</span>
                </NavLink>
            </li>
            <li>
                <NavLink className={linkClass} to="/dashboard/my-donation-requests">
                    <MdOutlineBloodtype size={20} />
                    <span>Donation History</span>
                </NavLink>
            </li>
            <li>
                <NavLink className={linkClass} to="/dashboard/create-donation-request">
                    <IoCreate size={20} />
                    <span>New Donation Request</span>
                </NavLink>
            </li>
        </ul>
    );
};

export default DonorPanel;