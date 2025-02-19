import { Outlet } from "react-router-dom";
import AdminPanel from "../../Components/AdminPanel/AdminPanel";
import DonorPanel from "../../Components/DonorPanel/DonorPanel";
import VolunteerPanel from "../../Components/Volunteer/VolunteerPanel";
import useRole from "../../Hook/useRole";
import useAuth from "../../Hook/useAuth";

const Dashboard = () => {
    const { isDarkMode } = useAuth();
    const [role, isLoading] = useRole();

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-red-50 text-gray-800'} flex flex-col md:flex-row`}>
            {/* Sidebar */}
            <div className='bg-red-400 w-full md:w-64 min-h-screen pl-5'>
                <ul className="menu p-4">
                    {/* Admin panel */}
                    {
                        role === 'Admin' && <AdminPanel />
                    }
                    {/* Donor panel */}
                    {
                        role === 'donor' && <DonorPanel />
                    }
                    {/* Volunteer panel */}
                    {
                        role === 'volunteer' && <VolunteerPanel />
                    }
                </ul>
            </div>
            {/* Main Content */}
            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-red-50'} flex-1 p-4 md:p-10`}>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;