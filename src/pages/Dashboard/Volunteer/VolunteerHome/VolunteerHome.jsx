import { FaUsers, FaHandHoldingHeart } from "react-icons/fa";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hook/useAuth";
import { Helmet } from "react-helmet-async";
import { RiRefund2Line } from "react-icons/ri";

// Recharts imports
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";

const VolunteerHome = () => {
    const { user, isDarkMode } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ["states"],
        queryFn: async () => {
            const res = await axiosSecure.get("/states");
            return res.data;
        },
    });

    // Chart data
    const barData = [
        { name: "Donors", value: stats.users || 0 },
        { name: "Donations", value: stats.donations || 0 },
        { name: "Funds ($)", value: stats.funds || 0 },
    ];

    const pieData = [
        { name: "Donors", value: stats.users || 0 },
        { name: "Donations", value: stats.donations || 0 },
        { name: "Funds", value: stats.funds || 0 },
    ];

    const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

    return (
        <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-red-50 text-black"} p-5`}>
            <Helmet>
                <title>Volunteer Dashboard | BloodBanker</title>
            </Helmet>

            <div className="mb-6">
                <h2 className="text-2xl font-bold">
                    Welcome <span className="text-red-400">{user?.displayName}</span> !
                </h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg rounded-lg p-5 border ${isDarkMode ? "border-gray-700" : "border-red-300"}`}>
                    <div className="flex items-center space-x-4">
                        <div className={`${isDarkMode ? "bg-gray-700" : "bg-red-100"} p-3 rounded-full`}>
                            <FaUsers className={`${isDarkMode ? "text-white" : "text-red-500"} text-2xl`} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{stats.users || 0}</h3>
                            <p className="text-gray-600">Total Donors</p>
                        </div>
                    </div>
                </div>
                <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg rounded-lg p-5 border ${isDarkMode ? "border-gray-700" : "border-red-300"}`}>
                    <div className="flex items-center space-x-4">
                        <div className={`${isDarkMode ? "bg-gray-700" : "bg-green-100"} p-3 rounded-full`}>
                            <FaHandHoldingHeart className={`${isDarkMode ? "text-white" : "text-green-500"} text-2xl`} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{stats.donations || 0}</h3>
                            <p className="text-gray-600">Blood Donation Requests</p>
                        </div>
                    </div>
                </div>
                <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg rounded-lg p-5 border ${isDarkMode ? "border-gray-700" : "border-red-300"}`}>
                    <div className="flex items-center space-x-4">
                        <div className={`${isDarkMode ? "bg-gray-700" : "bg-blue-100"} p-3 rounded-full`}>
                            <RiRefund2Line className={`${isDarkMode ? "text-white" : "text-blue-500"} text-2xl`} />
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
                <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg rounded-lg p-5`}>
                    <h3 className="text-lg font-bold mb-4">Overview (Bar Chart)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value">
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg rounded-lg p-5`}>
                    <h3 className="text-lg font-bold mb-4">Distribution (Pie Chart)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {pieData.map((entry, index) => (
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

export default VolunteerHome;