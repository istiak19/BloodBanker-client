import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hook/useAuth";
import usePublic from "../../../../Hook/usePublic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CreateDonation = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = usePublic();
    const navigate = useNavigate();
    const [isActiveUser, setIsActiveUser] = useState(false);
    const { data } = useQuery({
        queryKey: ["userStatus", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/status/${user?.email}`);
            setIsActiveUser(res.data.isActive);
        },
    })

    const { data: upazilas } = useQuery({
        queryKey: ["upazilas"],
        queryFn: async () => {
            const res = await axiosPublic.get("/upazila");
            return res.data;
        },
    });

    const { data: districts } = useQuery({
        queryKey: ["districts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/district");
            return res.data;
        },
    });
    const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const donationInfo = {
            name: data.name,
            email: data.email,
            recipientName: data.recipientName,
            upazila: data.upazila,
            district: data.district,
            hospital: data.hospital,
            bloodGroup: data.bloodGroup,
            address: data.address,
            time: data.time,
            message: data.message,
            date: startDate,
            status: 'pending'
        }
        console.log(donationInfo)
        const res = await axiosSecure.post('/donation', donationInfo)
        console.log(res.data)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Your blood donation request has been successfully created!",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            navigate('/dashboard/my-donation-requests')
        }
    };

    return (
        <div>
            <Helmet>
                <title>CreateDonation || BloodBanker</title>
            </Helmet>
            {
                !isActiveUser ? (
                    <div className="text-center my-10">
                        <h2 className="text-2xl font-bold text-red-400">
                            Access Denied
                        </h2>
                        <p className="text-gray-700">
                            Your account is currently inactive. Please contact support for assistance.
                        </p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 text-center">Blood Donation Request Form</h2>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {/* Requester Information */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Requester Name</label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    value={user?.displayName}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Requester Email</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    value={user?.email}
                                    readOnly
                                    className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* Recipient Information */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Recipient Name</label>
                                <input
                                    type="text"
                                    {...register("recipientName")}
                                    placeholder="Enter recipient's name"
                                    className="w-full p-3 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Recipient District</label>
                                <select {...register("district")} className="w-full p-3 border rounded-md">
                                    <option value="">Select District</option>
                                    {districts?.map((district, idx) => (
                                        <option key={idx} value={district.name}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Recipient Upazila</label>
                                <select {...register("upazila")} className="w-full p-3 border rounded-md">
                                    <option value="">Select Upazila</option>
                                    {upazilas?.map((u) => (
                                        <option key={u.id} value={u.name}>
                                            {u.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Hospital Information */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Hospital Name</label>
                                <input
                                    type="text"
                                    {...register("hospital")}
                                    placeholder="Enter hospital name"
                                    className="w-full p-3 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Full Address Line</label>
                                <input
                                    type="text"
                                    {...register("address")}
                                    placeholder="Enter full address"
                                    className="w-full p-3 border rounded-md"
                                />
                            </div>

                            {/* Blood Group */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
                                <select {...register("bloodGroup")} className="w-full p-3 border rounded-md">
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            {/* Donation Date & Time */}
                            <div className="flex w-full gap-5">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Donation Date</label>
                                    <DatePicker
                                        className="w-full p-3 border rounded-md"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700 font-medium mb-2">Donation Time</label>
                                    <input
                                        type="time"
                                        {...register("time")}
                                        className="w-full p-3 border rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Request Message */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Request Message</label>
                                <textarea
                                    {...register("message")}
                                    placeholder="Write your message here..."
                                    rows="4"
                                    className="w-full p-3 border rounded-md"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-red-400 text-white rounded-md hover:bg-red-600"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default CreateDonation;