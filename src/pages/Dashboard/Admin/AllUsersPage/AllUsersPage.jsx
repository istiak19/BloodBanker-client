import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { HiDotsVertical } from "react-icons/hi";
import useAuth from "../../../../Hook/useAuth";

const AllUsersPage = () => {
    const { isDarkMode } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [filterStatus, setFilterStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

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

    const statusUsers = users.filter(user =>
        filterStatus === "" || user?.status === filterStatus
    );
    const totalItems = statusUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedUsers = statusUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className={`p-5 ${isDarkMode ? "bg-gray-800 text-white" : "bg-red-50 text-gray-800"}`}>
            <Helmet>
                <title>AllUsers || BloodBanker</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-5 text-center">All Users Page</h2>
            <div className="mb-4 flex gap-4">
                <button
                    className={`px-4 py-2 rounded ${filterStatus === "" ? "bg-red-500 text-white" : "bg-red-300"}`}
                    onClick={() => setFilterStatus("")}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 rounded ${filterStatus === "active" ? "bg-red-500 text-white" : "bg-red-300"}`}
                    onClick={() => setFilterStatus("active")}
                >
                    Active
                </button>
                <button
                    className={`px-4 py-2 rounded ${filterStatus === "blocked" ? "bg-red-500 text-white" : "bg-red-300"}`}
                    onClick={() => setFilterStatus("blocked")}
                >
                    Blocked
                </button>
            </div>
            <div className="mb-4">
                <label className="mr-2">Rows per page:</label>
                <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className={`p-2 border border-gray-300 rounded ${isDarkMode ? "bg-gray-800 text-white" : "bg-red-50 text-gray-800"}`}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
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
                            paginatedUsers.map((user) => (
                                <tr key={user._id} className={`${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
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
                                    <td className="border p-3 text-center relative">
                                        <div className="relative group inline-block">
                                            <button className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"}`}>
                                                <HiDotsVertical
                                                    size={20}
                                                    className={`${isDarkMode ? "text-white" : "text-gray-800"}`}
                                                />
                                            </button>
                                            <div className={`absolute hidden group-hover:block z-10 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-red-200 text-black'} shadow-md rounded py-2 w-48 right-0`}>
                                                {user?.status === "active" && (
                                                    <button
                                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                                        onClick={() => handleBlockUser(user?._id)}
                                                    >
                                                        Block
                                                    </button>
                                                )}
                                                {user?.status === "blocked" && (
                                                    <button
                                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                                        onClick={() => handleUnblockUser(user?._id)}
                                                    >
                                                        Unblock
                                                    </button>
                                                )}
                                                {user?.role !== "volunteer" && (
                                                    <button
                                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                                        onClick={() => handleMakeVolunteer(user?._id)}
                                                    >
                                                        Make Volunteer
                                                    </button>
                                                )}
                                                {user?.role !== "admin" && (
                                                    <button
                                                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                                        onClick={() => handleMakeAdmin(user?._id)}
                                                    >
                                                        Make Admin
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-5">
                <div className="flex gap-2">
                    {
                        Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 rounded-md border ${currentPage === i + 1 ? "bg-red-400 text-white" : "bg-white text-red-500"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AllUsersPage;