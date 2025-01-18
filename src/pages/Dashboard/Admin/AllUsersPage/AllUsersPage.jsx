import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllUsersPage = () => {
    const axiosSecure = useAxiosSecure();
    const [filterStatus, setFilterStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", filterStatus, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user`);
            return res.data;
        },
    });

    const handleBlockUser = async (userId) => {
        const res = await axiosSecure.patch(`/user/${userId}`, { status: "blocked" });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User blocked successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    const handleUnblockUser = async (userId) => {
        const res = await axiosSecure.patch(`/user/${userId}`, { status: "active" });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User unblocked successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    const handleMakeVolunteer = async (userId) => {
        const res = await axiosSecure.patch(`/users/${userId}`, { role: "volunteer" });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User role updated to volunteer!",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    const handleMakeAdmin = async (userId) => {
        const res = await axiosSecure.patch(`/users/${userId}`, { role: "Admin" });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User role updated to admin!",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    const totalPages = Math.ceil(users.total / itemsPerPage);
    const statusUsers = users.filter(user =>
        filterStatus === "" || user?.status === filterStatus
    );

    return (
        <div className="p-5">
            <Helmet>
                <title>AllUsers || BloodBanker</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-5 text-center">All Users Page</h2>
            <div className="mb-4 flex gap-4">
                <button
                    className={`px-4 py-2 rounded ${filterStatus === "" ? "bg-red-400 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilterStatus("")}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 rounded ${filterStatus === "active" ? "bg-red-400 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilterStatus("active")}
                >
                    Active
                </button>
                <button
                    className={`px-4 py-2 rounded ${filterStatus === "blocked" ? "bg-red-400 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilterStatus("blocked")}
                >
                    Blocked
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3">Avatar</th>
                            <th className="border p-3">Email</th>
                            <th className="border p-3">Name</th>
                            <th className="border p-3">Role</th>
                            <th className="border p-3">Status</th>
                            <th className="border p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            statusUsers.map((user) => (
                                <tr key={user._id}>
                                    <td className="border p-3 text-center">
                                        <img
                                            src={user?.photo || "N/A"}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full mx-auto"
                                        />
                                    </td>
                                    <td className="border p-3">{user?.email}</td>
                                    <td className="border p-3">{user?.name}</td>
                                    <td className="border p-3 capitalize">{user?.role}</td>
                                    <td className="border p-3 capitalize">{user?.status}</td>
                                    <td className="border p-3 space-x-2">
                                        {
                                            user?.status === "active" && (
                                                <button
                                                    className="px-3 py-1 bg-red-400 text-white rounded"
                                                    onClick={() => handleBlockUser(user?._id)}
                                                >
                                                    Block
                                                </button>
                                            )
                                        }
                                        {
                                            user?.status === "blocked" && (
                                                <button
                                                    className="px-3 py-1 bg-red-400 text-white rounded"
                                                    onClick={() => handleUnblockUser(user?._id)}
                                                >
                                                    Unblock
                                                </button>
                                            )
                                        }
                                        {
                                            user?.role !== "volunteer" && (
                                                <button
                                                    className="px-3 py-1 bg-red-400 text-white rounded"
                                                    onClick={() => handleMakeVolunteer(user?._id)}
                                                >
                                                    Make Volunteer
                                                </button>
                                            )
                                        }
                                        {
                                            user?.role !== "admin" && (
                                                <button
                                                    className="px-3 py-1 bg-red-400 text-white rounded"
                                                    onClick={() => handleMakeAdmin(user?._id)}
                                                >
                                                    Make Admin
                                                </button>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {/* <div className="mt-4 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div> */}
        </div>
    );
};

export default AllUsersPage;