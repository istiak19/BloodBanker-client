import { Outlet } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import AdminPanel from "../../Components/AdminPanel/AdminPanel";
import DonorPanel from "../../Components/DonorPanel/DonorPanel";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex w-11/12 mx-auto">
            <div className="w-64 min-h-screen bg-red-400">
                <ul className="menu p-4">
                    {/* Admin panel */}
                    {isAdmin && (
                        <>
                            <AdminPanel></AdminPanel>
                        </>
                    )}
                    {/* Donor panel */}
                    {!isAdmin && (
                        <>
                            <DonorPanel></DonorPanel>
                        </>
                    )}
                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;