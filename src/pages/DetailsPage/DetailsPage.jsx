import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

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

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-red-50 text-gray-900'} p-5`}>
            <Helmet>
                <title>DetailsPage | BloodBanker</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-center mb-5">Donation Request Details</h1>
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-red-100'} max-w-xl mx-auto p-6 border border-gray-200 shadow-md rounded-lg`}>
                <h2 className="text-xl font-semibold mb-4 text-center">Recipient Information</h2>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {donation?.recipientName}</p>
                    <p><strong>Location:</strong> {donation?.upazila}, {donation?.district}</p>
                    <p><strong>Blood Group:</strong> {donation?.bloodGroup}</p>
                    <p><strong>Date:</strong> {new Date(donation?.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {donation?.time}</p>
                    <p><strong>Message:</strong> {donation?.message || "N/A"}</p>
                    <p><strong>Hospital:</strong> {donation?.hospital}</p>
                    <p><strong>Address:</strong> {donation?.address}</p>
                </div>
                <button
                    className={`${isDarkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-red-400 hover:bg-red-300'} w-full text-white font-semibold py-2 px-4 rounded mt-6 transition`}
                    onClick={() => setModalOpen(true)}
                >
                    Donate
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded shadow-lg max-w-md w-full`}>
                        <h2 className="text-xl font-bold mb-4 text-center">Confirm Your Donation</h2>
                        <form>
                            <div className="mb-4">
                                <label className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} block font-medium mb-2`}>
                                    Donor Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                    className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} w-full p-3 border rounded-md`}
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} block font-medium mb-2`}>
                                    Donor Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} w-full p-3 border rounded-md`}
                                />
                            </div>
                        </form>
                        <div className="flex justify-between items-center mt-6">
                            <button
                                className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'} px-4 py-2 rounded transition`}
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`${isDarkMode ? 'bg-green-600 hover:bg-green-500' : 'bg-green-500 hover:bg-green-400'} text-white px-4 py-2 rounded transition`}
                                onClick={handleConfirmDonation}
                            >
                                Confirm Donation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsPage;