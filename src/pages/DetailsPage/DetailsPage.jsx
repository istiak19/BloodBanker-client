import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Loading from "../../Components/Loading/Loading";

const DetailsPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, isDarkMode } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);

    const { data: donation, isLoading, refetch } = useQuery({
        queryKey: ["detailsDonation", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation/${id}`);
            return res.data;
        },
    });

    const handleConfirmDonation = async () => {
        const updatedDonation = { status: "inprogress" };
        const res = await axiosSecure.patch(`/donation/${id}`, updatedDonation);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Donation confirmed successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            setModalOpen(false);
            refetch();
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-red-50 text-gray-900'} min-h-screen py-10 px-4 transition-all duration-300`}>
            <Helmet>
                <title>Donation Details | BloodBanker</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-center mb-8 tracking-wide">Donation Request Details</h1>

            {/* Card */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} max-w-3xl mx-auto p-8 rounded-2xl shadow-lg transition-all duration-300`}>
                <h2 className="text-2xl font-semibold mb-6 text-center border-b pb-4">Recipient Information</h2>
                <div className="space-y-4 text-lg">
                    <p><span className="font-semibold">Name:</span> {donation?.recipientName}</p>
                    <p><span className="font-semibold">Location:</span> {donation?.upazila}, {donation?.district}</p>
                    <p><span className="font-semibold">Blood Group:</span> {donation?.bloodGroup}</p>
                    <p><span className="font-semibold">Date:</span> {new Date(donation?.date).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Time:</span> {donation?.time}</p>
                    <p><span className="font-semibold">Message:</span> {donation?.message || "No message provided."}</p>
                    <p><span className="font-semibold">Hospital:</span> {donation?.hospital}</p>
                    <p><span className="font-semibold">Address:</span> {donation?.address}</p>
                </div>

                <button
                    className="mt-8 w-full py-3 text-lg font-semibold rounded-xl shadow-md transition-transform duration-300 bg-gradient-to-r from-red-400 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white"
                    onClick={() => setModalOpen(true)}
                >
                    Donate Now
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} w-full max-w-md mx-auto p-8 rounded-2xl shadow-xl transition-all duration-300`}>
                        <h2 className="text-2xl font-bold mb-6 text-center">Confirm Donation</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block mb-2 font-medium">Donor Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                    className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Donor Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8">
                            <button
                                className="px-5 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-400 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white transition"
                                onClick={handleConfirmDonation}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsPage;