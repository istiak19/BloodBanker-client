import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex w-11/12 mx-auto">
            <div className="w-64 min-h-screen bg-red-400">

            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;