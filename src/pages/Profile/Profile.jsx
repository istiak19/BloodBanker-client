import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hook/useAuth";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Profile = () => {
    const { user } = useAuth();
    // const axiosPublic = usePublic();
    const  axiosSecure=useAxiosSecure()
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState(data);

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleSave = async () => {
        setIsEditable(false);
        console.log("Saved Data:", formData);
        const res = await axiosPublic.put(`/user/${formData?._id}`, formData);
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Your Profile Updated!",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-red-100 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
                {!isEditable ? (
                    <button
                        className="px-4 py-2 bg-red-400 text-white text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 focus:outline-none focus:ring"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                )}
            </div>

            <form id="profile-form" className="space-y-4">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-gray-300">
                        <img
                            src={formData?.photo}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Name */}
                <div>
                    <input
                        type="text"
                        name="name"
                        value={formData?.name || ""}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-800"
                    />
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData?.email}
                        disabled
                        className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-800"
                    />
                </div>

                {/* District */}
                <div>
                    <input
                        type="text"
                        name="district"
                        value={formData?.district || ""}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-800"
                    />
                </div>

                {/* Upazila */}
                <div>
                    <input
                        type="text"
                        name="upazila"
                        value={formData?.upazila || ""}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-800"
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <input
                        type="text"
                        name="bloodGroup"
                        value={formData?.bloodGroup || ""}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-800"
                    />
                </div>

                {/* Save Button */}
                {isEditable && (
                    <div className="flex justify-end space-x-4 mt-4" id="form-buttons">
                        <button
                            type="button"
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Profile;
