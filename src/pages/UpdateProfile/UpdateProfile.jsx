import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const UpdateProfile = () => {
    const { user, isDarkMode } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ["profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const district = formData.get("district");
        const upazila = formData.get("upazila");
        const bloodGroup = formData.get("bloodGroup");
        const userInfo = { name, district, upazila, bloodGroup };
        const res = await axiosSecure.put(`/user/${data?._id}`, userInfo);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Profile Updated!",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/dashboard/profile");
        }
    };

    return (
        <div className={`border-x-2 border-red-300 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-red-100 text-gray-800'} container mx-auto p-8 rounded-2xl shadow-2xl`}>
            <Helmet>
                <title>Edit Profile | BloodBanker</title>
            </Helmet>

            <h2 className="text-3xl font-bold text-center mb-8">Edit Profile</h2>

            <div className="flex justify-center mb-8">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-red-500 shadow-lg hover:scale-105 transition-transform duration-300">
                    <img src={data?.photo} alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={data?.name || ""}
                        placeholder="Enter your full name"
                        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-400 focus:outline-none`}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data?.email}
                        disabled
                        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} w-full px-4 py-3 rounded-xl border opacity-80`}
                    />
                </div>

                {/* District */}
                <div>
                    <label className="block text-sm font-semibold mb-1">District</label>
                    <input
                        type="text"
                        name="district"
                        defaultValue={data?.district || ""}
                        placeholder="Enter your district"
                        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-400 focus:outline-none`}
                    />
                </div>

                {/* Upazila */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Upazila</label>
                    <input
                        type="text"
                        name="upazila"
                        defaultValue={data?.upazila || ""}
                        placeholder="Enter your upazila"
                        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-400 focus:outline-none`}
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Blood Group</label>
                    <select
                        name="bloodGroup"
                        defaultValue={data?.bloodGroup || ""}
                        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-red-400 focus:outline-none`}
                    >
                        <option value="" disabled>Select your blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 transition-all duration-300 rounded-xl text-white font-semibold shadow-md hover:shadow-lg"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;