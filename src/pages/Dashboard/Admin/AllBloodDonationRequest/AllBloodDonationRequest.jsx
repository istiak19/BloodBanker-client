import { useState } from "react";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hook/useAuth";

const AllBloodDonationRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { isDarkMode } = useAuth();
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const { data: donations = [], refetch } = useQuery({
        queryKey: ['donations'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations`);
            return res.data;
        }
    });

    const filteredDonations = donations.filter(donation =>
        filter === "" || donation?.status === filter
    );
    const totalItems = filteredDonations.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedDonations = filteredDonations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const updateRequestStatus = async (id, newStatus) => {
        const res = await axiosSecure.patch(`/donation/${id}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Status updated to ${newStatus}`,
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    return (
        <div className="p-4">
            <Helmet>
                <title>All Blood Donation | BloodBanker</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-center mb-5">All Blood Donation Requests</h2>
            <div className="flex justify-between items-center">
                <div className="mb-5">
                    <label htmlFor="filter" className={`font-medium mb-2 mr-5 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        Filter by Status
                    </label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={`p-3 border rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="itemsPerPage" className={`font-medium mr-3 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                        Items Per Page:
                    </label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className={`p-2 border rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
                    >
                        <option value={4}>4</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>

            {/* Donation Requests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {
                    paginatedDonations.map(donation => (
                        <div key={donation._id} className={`card shadow-md hover:shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                            <div className="card-body">
                                <h2 className="card-title">Recipient: {donation?.recipientName}</h2>
                                <p>Blood Group: {donation?.bloodGroup}</p>
                                <p>Date: {new Date(donation?.date).toLocaleDateString()}</p>
                                <p>Time: {donation?.time}</p>
                                <p>Status: {donation?.status}</p>
                                <p>Location: {donation?.upazila}, {donation?.district}</p>
                            </div>
                            <div className="card-footer mb-5 flex justify-evenly space-x-3">
                                {
                                    donation?.status !== "done" && (
                                        <button
                                            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-red-400 hover:bg-red-600'} text-white`}
                                            onClick={() => updateRequestStatus(donation._id, "done")}
                                        >
                                            Mark as Done
                                        </button>
                                    )
                                }
                                {
                                    donation?.status !== "canceled" && (
                                        <button
                                            className={`px-4 py-2 rounded ${isDarkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-red-400 hover:bg-red-600'} text-white`}
                                            onClick={() => updateRequestStatus(donation._id, "canceled")}
                                        >
                                            Cancel
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
                {
                    paginatedDonations.length === 0 && (
                        <div className="col-span-full text-center">
                            <p>No pending donations found.</p>
                        </div>
                    )
                }
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-5">
                <div className="flex gap-2">
                    {/* Previous button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md border ${currentPage === 1
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : isDarkMode
                                    ? "bg-gray-800 text-white hover:bg-gray-700"
                                    : "bg-white text-red-500 hover:bg-red-100"
                            }`}
                    >
                        Previous
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-4 py-2 rounded-md border ${currentPage === i + 1
                                    ? "bg-red-400 text-white"
                                    : isDarkMode
                                        ? "bg-gray-800 text-white hover:bg-gray-700"
                                        : "bg-white text-red-500 hover:bg-red-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Next button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md border ${currentPage === totalPages
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : isDarkMode
                                    ? "bg-gray-800 text-white hover:bg-gray-700"
                                    : "bg-white text-red-500 hover:bg-red-100"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllBloodDonationRequest;