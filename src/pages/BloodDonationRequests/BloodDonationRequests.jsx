import { useQuery } from "@tanstack/react-query";
import usePublic from "../../Hook/usePublic";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BloodDonationRequests = () => {
    const axiosPublic = usePublic();
    const { data: donations = [] } = useQuery({
        queryKey: ['donationPublic'],
        queryFn: async () => {
            const res = await axiosPublic.get('/donations');
            return res.data;
        }
    });
    const pendingDonations = donations.filter(donation => donation.status === "pending");

    return (
        <div className="p-5 w-11/12 mx-auto">
            <Helmet>
                <title>BloodDonation || BloodBanker</title>
            </Helmet>
            <h1 className="text-2xl font-bold text-center mb-5">Pending Blood Donation Requests</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    pendingDonations.map(donation => (
                        <div key={donation._id} className="card shadow-md p-4 border border-gray-200 rounded-lg">
                            <h2 className="font-bold text-lg">Recipient: {donation.recipientName}</h2>
                            <p>Location: {donation.upazila}, {donation.district}</p>
                            <p>Blood Group: {donation.bloodGroup}</p>
                            <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
                            <p>Time: {donation.time}</p>
                            <Link to={`/details/${donation._id}`}
                                className="mt-3 bg-red-400 text-center text-white px-4 py-2 rounded hover:bg-red-500 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default BloodDonationRequests;