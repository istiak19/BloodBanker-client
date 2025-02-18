import { Link } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Loading from "../../Components/Loading/Loading";

const Profile = () => {
    const { user } = useAuth();
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
        <div className="max-w-xl mx-auto p-6 bg-red-100 rounded-lg shadow-md">
            <Helmet>
                <title>Profile | BloodBanker</title>
            </Helmet>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
                <Link
                    to="/dashboard/edit-profile"
                    className="btn bg-red-400 text-white text-sm rounded-lg hover:bg-red-600 focus:outline-none focus:ring"
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
                <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-800 font-semibold">{data?.name}</p>
                <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-800">{data?.email}</p>

                {
                    data?.district && data?.upazila && data?.bloodGroup ? (
                        <>
                            <p className="bg-gray-100 px-3 py-2 rounded-lg text-gray-800">{data?.district}</p>
                            <p className="bg-gray-100 px-3 py-2 rounded-lg text-gray-800">{data?.upazila}</p>
                            <p className="bg-gray-100 px-3 py-2 rounded-lg text-gray-800">{data?.bloodGroup}</p>
                        </>
                    ) : (
                        <p className="px-3 py-2 rounded-lg bg-yellow-100 text-red-600">
                            Please edit your profile to add district, upazila, and blood group.
                        </p>
                    )
                }
            </div>
        </div >
    );
};

export default Profile;