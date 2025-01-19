import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAuth from "../../../../Hook/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const MyDonationRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState("");

    const { data: donations = [] } = useQuery({
        queryKey: ['homeDonation', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${user?.email}`);
            return res.data;
        }
    });

    const filteredDonations = donations.filter(donation =>
        filter === "" || donation?.status === filter
    );

    return (
        <div>
            <Helmet>
                <title>DonationRequests || BloodBanker</title>
            </Helmet>
            <div className="mb-5">
                <label htmlFor="filter" className="text-gray-700 font-medium mb-2 mr-5">
                    Filter by Status
                </label>
                <select
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-3 border rounded-md"
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    filteredDonations.map(donation => (
                        <div key={donation._id} className="card shadow-md bg-red-100">
                            <div className="card-body">
                                <h2 className="card-title">Recipient: {donation?.recipientName}</h2>
                                <p>Blood Group: {donation?.bloodGroup}</p>
                                <p>Date: {new Date(donation?.date).toLocaleDateString()}</p>
                                <p>Time: {donation?.time}</p>
                                <p>Status: {donation?.status}</p>
                                <p>Location: {donation?.upazila}, {donation?.district}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MyDonationRequests;