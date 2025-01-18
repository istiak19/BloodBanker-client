import { Outlet } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import AdminPanel from "../../Components/AdminPanel/AdminPanel";
import DonorPanel from "../../Components/DonorPanel/DonorPanel";
import useVolunteer from "../../Hook/useVolunteer";
import VolunteerPanel from "../../Components/Volunteer/VolunteerPanel";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer();

    return (
        <div className="flex flex-col md:flex-row w-full">
            {/* Sidebar */}
            <div className="w-full md:w-64 min-h-screen bg-red-400">
                <ul className="menu p-4">
                    {/* Admin panel */}
                    {isAdmin && (
                        <>
                            <AdminPanel />
                        </>
                    )}
                    {/* Donor panel */}
                    {!isAdmin && !isVolunteer && (
                        <>
                            <DonorPanel />
                        </>
                    )}
                    {/* Volunteer panel */}
                    {!isAdmin && isVolunteer && (
                        <>
                            <VolunteerPanel></VolunteerPanel>
                        </>
                    )}
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