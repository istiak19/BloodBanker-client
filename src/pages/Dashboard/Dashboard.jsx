import { Outlet } from "react-router-dom";
import AdminPanel from "../../Components/AdminPanel/AdminPanel";
import DonorPanel from "../../Components/DonorPanel/DonorPanel";
import VolunteerPanel from "../../Components/Volunteer/VolunteerPanel";
import useRole from "../../Hook/useRole";

const Dashboard = () => {
    const [role, isLoading] = useRole()

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 min-h-screen bg-red-400 pl-5">
                <ul className="menu p-4">
                    {/* Admin panel */}
                    {
                        role === 'Admin' && <AdminPanel></AdminPanel>
                    }
                    {/* Donor panel */}
                    {
                        role === 'donor' && <DonorPanel></DonorPanel>
                    }
                    {/* Volunteer panel */}
                    {
                        role === 'volunteer' && <VolunteerPanel></VolunteerPanel>
                    }
                </ul>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-4 md:p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;