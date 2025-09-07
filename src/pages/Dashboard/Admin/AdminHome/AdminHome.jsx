import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hook/useAuth";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { FaUsers, FaHandHoldingHeart } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import { Helmet } from "react-helmet-async";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
} from "recharts";

const AdminHome = () => {
    const { user, isDarkMode } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: stats = {} } = useQuery({
        queryKey: ["states"],
        queryFn: async () => {
            const res = await axiosSecure.get("/states");
            return res.data;
        },
    });

    // Chart Data
    const chartData = [
        { name: "Donors", value: stats.users || 0 },
        { name: "Donations", value: stats.donations || 0 },
        { name: "Funds", value: stats.funds || 0 },
    ];

    const COLORS = ["#ef4444", "#22c55e", "#3b82f6"];

    return (
        <div
            className="p-5">
            <Helmet>
                <title>Admin Dashboard | BloodBanker</title>
            </Helmet>
            <div className="mb-6">
                <h2 className="text-2xl font-bold">
                    Welcome <span className="text-red-400">{user?.displayName}</span> !
                </h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                <div
                    className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"
                        } shadow-lg hover:shadow-2xl rounded-lg p-5 border border-red-300`}
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <FaUsers className="text-red-500 text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{stats.users || 0}</h3>
                            <p className="text-gray-600">Total Donors</p>
                        </div>
                    </div>
                </div>
                <div
                    className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"
                        } shadow-lg hover:shadow-2xl rounded-lg p-5 border border-red-300`}
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <FaHandHoldingHeart className="text-green-500 text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{stats.donations || 0}</h3>
                            <p className="text-gray-600">Blood Donation Requests</p>
                        </div>
                    </div>
                </div>
                <div
                    className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"
                        } shadow-lg hover:shadow-2xl rounded-lg p-5 border border-red-300`}
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <RiRefund2Line className="text-blue-500 text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{stats.funds || 0} $</h3>
                            <p className="text-gray-600">Fund Collection</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Bar Chart */}
                <div
                    className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"
                        } shadow-lg rounded-lg p-5`}
                >
                    <h3 className="text-lg font-bold mb-4">Overview (Bar Chart)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#ef4444">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div
                    className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"
                        } shadow-lg rounded-lg p-5`}
                >
                    <h3 className="text-lg font-bold mb-4">Distribution (Pie Chart)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;