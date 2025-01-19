import { FaUsers, FaHandHoldingHeart } from "react-icons/fa";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hook/useAuth";
import { Helmet } from "react-helmet-async";
import { RiRefund2Line } from "react-icons/ri";

const VolunteerHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: stats = {} } = useQuery({
        queryKey: ['states'],
        queryFn: async () => {
            const res = await axiosSecure.get('/states');
            return res.data;
        },
    });

    return (
        <div>
            <Helmet>
                <title>VolunteerHome || BloodBanker</title>
            </Helmet>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-700">
                    Welcome <span className="text-red-400">{user?.displayName}</span> !
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-5 border border-red-300">
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
                <div className="bg-white shadow-lg rounded-lg p-5 border border-red-300">
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
                <div className="bg-white shadow-lg rounded-lg p-5 border border-red-300">
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
        </div>
    );
};

export default VolunteerHome;