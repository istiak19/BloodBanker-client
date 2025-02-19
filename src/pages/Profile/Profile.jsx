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

    if (isLoading) return <Loading></Loading>;

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-red-100 text-gray-800'} max-w-xl mx-auto p-6 rounded-lg shadow-md`}>
            <Helmet>
                <title>Profile | BloodBanker</title>
            </Helmet>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Profile</h2>
                <Link
                    to="/dashboard/edit-profile"
                    className={`${isDarkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-red-400 hover:bg-red-600'} btn text-white text-sm rounded-lg focus:outline-none focus:ring`}
                >
                    Update Profile
                </Link>
            </div>

            <div className="flex justify-center mb-6">
                <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-gray-300">
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