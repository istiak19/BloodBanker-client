import { useQuery } from "@tanstack/react-query";
import usePublic from "../../Hook/usePublic";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "../../Hook/useAuth";

const BloodDonationRequests = () => {
    const axiosPublic = usePublic();
    const { isDarkMode } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const { data: donations = [] } = useQuery({
        queryKey: ["donationPublic"],
        queryFn: async () => {
            const res = await axiosPublic.get("/donations");
            return res.data;
        },
    });

    const pendingDonations = donations.filter((donation) => donation.status === "pending");
    const totalItems = pendingDonations.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedDonations = pendingDonations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={`p-12 w-full mx-auto transition-colors ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-red-50 text-gray-800"}`}>
            <Helmet>
                <title>BloodDonation | BloodBanker</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center mb-5">Pending Blood Donation Requests</h1>
            {/* Items Per Page Dropdown */}
            <div className="mb-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                <label htmlFor="itemsPerPage" className="font-medium">
                    Items Per Page:
                </label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className={`p-2 border rounded-md ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-red-50 text-black border-gray-300"}`}
                >
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                    <option value={12}>12</option>
                </select>
            </div>
            {/* Donation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    paginatedDonations.map((donation) => (
                        <div
                            key={donation._id}
                            className={`p-4 rounded-lg shadow-md hover:shadow-xl transition ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-red-100 text-gray-800"}`}
                        >
                            <h2 className="font-bold text-lg">Recipient: {donation.recipientName}</h2>
                            <p>Location: {donation.upazila}, {donation.district}</p>
                            <p>Blood Group: {donation.bloodGroup}</p>
                            <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
                            <p>Time: {donation.time}</p>
                            <Link
                                to={`/details/${donation._id}`}
                                className="mt-3 block bg-red-400 text-center text-white px-4 py-2 rounded hover:bg-red-500 transition"
                            >
                                View Details
                            </Link>
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
                    {
                        Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 rounded-md border transition ${currentPage === i + 1
                                    ? "bg-red-400 text-white"
                                    : isDarkMode
                                        ? "bg-gray-700 text-gray-300 border-gray-500"
                                        : "bg-white text-red-400 border-gray-300"
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

export default BloodDonationRequests;