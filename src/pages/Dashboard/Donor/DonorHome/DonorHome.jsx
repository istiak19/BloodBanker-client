import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hook/useAuth";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const DonorHome = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: recentDonations, refetch } = useQuery({
        queryKey: ['homeDonation', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${user?.email}`);
            return res.data;
        }
    })

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You donation request delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/donation/${id}`)
                // console.log(res.data)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your donation request has been successfully deleted",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    }

    return (
        <div className="max-w-7xl mx-auto p-6 border border-red-300 shadow-md rounded-lg">
            <Helmet>
                <title>DonorHome | BloodBanker</title>
            </Helmet>
            {/* Welcome Section */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-700">
                    Welcome <span className="text-red-400">{user?.displayName}</span>!
                </h2>
                <p className="text-gray-500">
                    Here are your recent donation requests.
                </p>
            </div>

            {/* Recent Donation Requests */}
            {
                recentDonations?.length > 0 ? (
                    <div>
                        <h3 className="text-xl font-bold text-center text-gray-700 mb-4">
                            Recent Donation Requests
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Recipient</th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Blood Group</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        recentDonations?.slice(0, 3)?.map((donation, index) => (
                                            <tr key={donation._id} className="hover:bg-gray-50">
                                                <td>{index + 1}</td>
                                                <td>{donation?.recipientName}</td>
                                                <td>{donation?.upazila}, {donation?.district}</td>
                                                <td>{new Date(donation?.date).toLocaleDateString()}</td>
                                                <td>{donation?.time}</td>
                                                <td>{donation?.bloodGroup}</td>
                                                <td>{donation?.status}</td>
                                                <td>
                                                    {/* Buttons for In-Progress Actions */}
                                                    {
                                                        donation?.status === "inprogress" && (
                                                            <>
                                                                <button
                                                                    className="btn bg-red-400 text-white btn-sm mr-2"
                                                                    onClick={() =>
                                                                        updateStatusMutation.mutate({ id: donation._id, status: "done" })
                                                                    }
                                                                >
                                                                    Done
                                                                </button>
                                                                <button
                                                                    className="btn bg-red-400 text-white btn-sm mr-2"
                                                                    onClick={() =>
                                                                        updateStatusMutation.mutate({ id: donation._id, status: "canceled" })
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        )
                                                    }

                                                    {/* Edit, Delete, View Buttons */}
                                                    <button
                                                        className="btn bg-red-400 text-white btn-sm mr-2"
                                                        onClick={() => navigate(`/dashboard/donation/edit/${donation._id}`)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn bg-red-400 text-white btn-sm mr-2"
                                                        onClick={() =>
                                                            handleDelete(donation._id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link to={`/details/${donation._id}`}
                                                        className="btn bg-red-400 text-white btn-sm"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* View All Requests Button */}
                        <div className="text-center mt-6">
                            <button
                                className="btn bg-red-400 text-white"
                                onClick={() => navigate('/dashboard/my-donation-requests')}
                            >
                                View My All Requests
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">
                        You have not made any donation requests yet.
                    </p>
                )
            }
        </div>
    );
};

export default DonorHome;