import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Loading from "../../Components/Loading/Loading";

const Fund = () => {
    const axiosSecure = useAxiosSecure();
    const { isDarkMode } = useAuth();

    const { data: funds = [], isLoading } = useQuery({
        queryKey: ["funds"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className={`min-h-screen px-4 md:px-12 lg:px-24 py-12 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-r from-pink-100 to-red-200 text-gray-800'}`}>
            <Helmet>
                <title>Donate Funds | BloodBanker</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <h2 className="text-3xl font-bold tracking-tight">Funds Management</h2>
                <Link
                    to="/funding/add-fund"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-400 text-white font-semibold shadow-md hover:from-red-400 hover:to-pink-500 transition-all duration-300 border-white border"
                >
                    Donate Now
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-2xl bg-gradient-to-r from-yellow-400 to-orange-500">
                <table className={`w-full table-auto border-collapse ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <thead className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-red-100 text-gray-800'}`}>
                        <tr>
                            <th className="py-4 px-6 text-left border-b">#</th>
                            <th className="py-4 px-6 text-left border-b">Fund Name</th>
                            <th className="py-4 px-6 text-left border-b">Fund Amount</th>
                            <th className="py-4 px-6 text-left border-b">Funding Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            funds?.length > 0 ? funds.map((fund, idx) => (
                                <tr key={fund._id} className="hover:bg-gray-100 hover:text-white dark:hover:bg-gray-700 transition-colors border-b">
                                    <td className="py-4 px-6">{idx + 1}</td>
                                    <td className="py-4 px-6">{fund?.name}</td>
                                    <td className="py-4 px-6 font-semibold text-green-500">${fund?.amount}</td>
                                    <td className="py-4 px-6">{new Date(fund?.date).toLocaleDateString()}</td>
                                </tr>
                            ))
                                :
                                <tr>
                                    <td colSpan="4" className="text-center py-12 text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4M12 3v12" />
                                            </svg>
                                            No funds available.
                                        </div>
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Fund;