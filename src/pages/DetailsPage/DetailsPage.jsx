import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const DetailsPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
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

    // if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-center mb-5">Donation Request Details</h1>
            <div className="max-w-xl mx-auto p-6 bg-white border border-gray-200 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-center">Recipient Information</h2>
                <div className="space-y-2 text-gray-700">
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
                    className="mt-6 bg-red-400 w-full text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
                    onClick={() => setModalOpen(true)}
                >
                    Donate
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4 text-center">Confirm Your Donation</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Donor Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Donor Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100"
                                />
                            </div>
                        </form>
                        <div className="flex justify-between items-center mt-6">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
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