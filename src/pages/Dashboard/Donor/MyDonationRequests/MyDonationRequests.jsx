import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAuth from "../../../../Hook/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const MyDonationRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const { data: donations = [] } = useQuery({
        queryKey: ["homeDonation", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${user?.email}`);
            return res.data;
        },
    });
    const filteredDonations = donations.filter(
        (donation) => filter === "" || donation?.status === filter
    );
    const totalItems = filteredDonations.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedDonations = filteredDonations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const F = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div>
            <Helmet>
                <title>DonationRequests || BloodBanker</title>
            </Helmet>
            <div className="mb-5 flex justify-between items-center">
                <div>
                    <label htmlFor="filter" className="text-gray-700 font-medium mr-3">
                        Filter by Status
                    </label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="p-2 border rounded-md"
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="rowsPerPage" className="text-gray-700 font-medium mr-3">
                        Rows Per Page
                    </label>
                    <select
                        id="rowsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="p-2 border rounded-md"
                    >
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="border border-gray-300 px-4 py-2">Recipient</th>
                            <th className="border border-gray-300 px-4 py-2">Blood Group</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Time</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            paginatedDonations.map((donation) => (
                                <tr key={donation._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{donation?.recipientName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{donation?.bloodGroup}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(donation?.date).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(donation?.time).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{donation?.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {donation?.upazila}, {donation?.district}
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            paginatedDonations.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No donations found.
                                    </td>
                                </tr>
                            )
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

export default MyDonationRequests;