import { useQuery } from "@tanstack/react-query";
import usePublic from "../../Hook/usePublic";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAuth from "../../Hook/useAuth";
import Loading from "../../Components/Loading/Loading";

const BloodDonationRequests = () => {
    const axiosPublic = usePublic();
    const { isDarkMode } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const { data: donations = [], isLoading } = useQuery({
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

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className={`p-6 md:p-12 w-full mx-auto transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-red-50 text-gray-800"}`}>
            <Helmet>
                <title>Blood Donation | BloodBanker</title>
            </Helmet>

            <div className="text-center mb-5">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-red-400">Pending Blood Donation Requests</h1>
                <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">Help save lives by responding to donation requests. Every drop counts!</p>
            </div>

            {/* Items Per Page */}
            <div className="flex flex-col sm:flex-row items-center justify-end mb-3 gap-3">
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
                    className={`p-2 border rounded-lg cursor-pointer shadow-sm focus:outline-none ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
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
                            className={`p-6 rounded-2xl border hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-red-200"}`}
                        >
                            <div className="flex flex-col gap-2">
                                <h2 className="text-lg md:text-xl font-bold text-red-400">Recipient: {donation.recipientName}</h2>
                                <p><span className="font-semibold">Location:</span> {donation.upazila}, {donation.district}</p>
                                <p><span className="font-semibold">Blood Group:</span> {donation.bloodGroup}</p>
                                <p><span className="font-semibold">Date:</span> {new Date(donation.date).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Time:</span> {donation.time}</p>

                                <Link
                                    to={`/details/${donation._id}`}
                                    className="mt-4 inline-block w-full text-center bg-gradient-to-r from-red-400 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white font-semibold py-2 rounded-lg transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                }

                {
                    paginatedDonations.length === 0 && (
                        <div className="col-span-full text-center text-gray-500 mt-10">
                            <p>No pending donations found. 🎯</p>
                        </div>
                    )
                }
            </div>

            {/* Pagination */}
            {
                totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex flex-wrap gap-2">
                            {
                                Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-4 py-2 rounded-full border font-medium transition duration-300 ${currentPage === i + 1
                                                ? "bg-red-400 text-white"
                                                : isDarkMode
                                                    ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                                                    : "bg-white text-red-400 border-gray-300 hover:bg-red-100"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default BloodDonationRequests;