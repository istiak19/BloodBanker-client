import { Link } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loading from "../../Components/Loading/Loading";

const Profile = () => {
    const { user, isDarkMode } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className={`max-w-2xl border-x-2 border-red-300 mx-auto p-8 rounded-2xl shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-red-100 text-gray-800'} max-w-xl mx-auto p-6 rounded-lg shadow-md`}>
            <Helmet>
                <title>Profile | BloodBanker</title>
            </Helmet>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Profile</h2>
                <Link
                    to="/dashboard/edit-profile"
                    className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-400 text-white font-semibold shadow-md hover:from-red-400 hover:to-pink-500 transition-all duration-300 border-white border"
                >
                    Update Profile
                </Link>
            </div>

            <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-400 shadow-md">
                    <img src={data?.photo} alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="space-y-4">
                <p className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg font-semibold`}>{data?.name}</p>
                <p className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg`}>{data?.email}</p>

                {
                    data?.district && data?.upazila && data?.bloodGroup ? (
                        <>
                            <p className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg`}>{data?.district}</p>
                            <p className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg`}>{data?.upazila}</p>
                            <p className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg`}>{data?.bloodGroup}</p>
                        </>
                    ) : (
                        <p className={`${isDarkMode ? 'bg-yellow-200 text-red-600' : 'bg-yellow-100 text-red-600'} px-3 py-2 rounded-lg`}>
                            Please edit your profile to add district, upazila, and blood group.
                        </p>
                    )
                }
            </div>
        </div>
    );
};

export default Profile;