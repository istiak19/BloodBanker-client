import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const Fund = () => {
    const axiosSecure = useAxiosSecure();
    const { isDarkMode } = useAuth();
    const { data: funds = [] } = useQuery({
        queryKey: ["funds"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;
        },
    });

    return (
        <div className={`px-56 pb-10 pt-16 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
            <Helmet>
                <title>Funding | BloodBanker</title>
            </Helmet>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Funds Management</h2>
                <Link to="/funding/add-fund" className="btn bg-red-400 text-white">
                    Give Fund
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className={`table w-full ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
                    {/* head */}
                    <thead>
                        <tr>
                            <th className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>#</th>
                            <th className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Fund Name</th>
                            <th className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Fund Amount</th>
                            <th className={`${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Funding Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            funds?.map((fund, idx) => (
                                <tr key={fund._id}>
                                    <td>{idx + 1}</td>
                                    <td>{fund?.name}</td>
                                    <td>${fund?.amount}</td>
                                    <td>{new Date(fund?.date).toLocaleDateString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Fund;