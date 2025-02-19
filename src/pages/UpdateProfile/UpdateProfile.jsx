import { useState, useEffect } from "react";
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
        const name = formData.get('name');
        const district = formData.get('district');
        const upazila = formData.get('upazila');
        const bloodGroup = formData.get('bloodGroup');
        const userInfo = { name, district, upazila, bloodGroup };
        const res = await axiosSecure.put(`/user/${data?._id}`, userInfo);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Profile Updated!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/dashboard/profile");
        }
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'} max-w-xl mx-auto p-6 rounded-lg shadow-md`}>
            <Helmet>
                <title>Edit Profile | BloodBanker</title>
            </Helmet>
            <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
            <div className="flex justify-center mb-6">
                <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-gray-300">
                    <img src={data?.photo} alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </div>
            <form className="space-y-4" onSubmit={handleSave}>
                <div>
                    <label className="block">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={data?.name || ""}
                        className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} w-full px-3 py-2 border rounded-lg`}
                        placeholder="Enter your full name"
                    />
                </div>
                <div>
                    <label className="block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data?.email}
                        disabled
                        className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} w-full px-3 py-2 border rounded-lg`}
                    />
                </div>
                <div>
                    <label className="block">District</label>
                    <input
                        type="text"
                        name="district"
                        defaultValue={data?.district || ""}
                        className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} w-full px-3 py-2 border rounded-lg`}
                    />
                </div>
                <div>
                    <label className="block">Upazila</label>
                    <input
                        type="text"
                        name="upazila"
                        defaultValue={data?.upazila || ""}
                        className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} w-full px-3 py-2 border rounded-lg`}
                    />
                </div>
                <div>
                    <label className="block">Blood Group</label>
                    <select
                        name="bloodGroup"
                        defaultValue={data?.bloodGroup || ""}
                        className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} w-full px-3 py-2 border rounded-lg`}
                    >
                        <option value="" disabled>Select Blood Group</option>
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

                <input
                    type="submit"
                    className={`${isDarkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-red-400 hover:bg-red-600'} btn w-full text-white rounded-lg`}
                    value="Update Profile"
                />
            </form>
        </div>
    );
};

export default UpdateProfile;