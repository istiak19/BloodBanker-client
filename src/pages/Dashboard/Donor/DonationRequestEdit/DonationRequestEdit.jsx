import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import usePublic from '../../../../Hook/usePublic';
import { Helmet } from 'react-helmet-async';

const DonationRequestEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = usePublic();
    const [startDate, setStartDate] = useState(new Date());

    const { data: donation, isLoading } = useQuery({
        queryKey: ['donation', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation/${id}`);
            return res.data;
        }
    });

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

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        const donationInfo = {
            recipientName: data.recipientName,
            upazila: data.upazila,
            district: data.district,
            hospital: data.hospital,
            bloodGroup: data.bloodGroup,
            address: data.address,
            time: data.time,
            message: data.message,
            date: startDate,
        }
        console.log(donation._id)
        const res = await axiosSecure.put(`/donation/${donation._id}`, donationInfo)
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Your blood donation request has been successfully updated!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-donation-requests');
        }
    }

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 border border-gray-200 shadow rounded-lg">
            <Helmet>
                <title>DonationRequestEdit || BloodBanker</title>
            </Helmet>
            <h2 className="text-2xl font-bold text-center mb-4">Edit Donation Request</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Recipient Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Recipient Name</label>
                    <input
                        type="text"
                        {...register("recipientName")}
                        defaultValue={donation?.recipientName}
                        placeholder="Enter recipient's name"
                        className="w-full p-3 border rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Recipient District</label>
                    <select {...register("district")}
                        defaultValue={donation?.district}
                        className="w-full p-3 border rounded-md">
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
                    <select {...register("upazila")}
                        defaultValue={donation?.upazila}
                        className="w-full p-3 border rounded-md">
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
                        defaultValue={donation?.hospital}
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
                        defaultValue={donation?.address}
                        placeholder="Enter full address"
                        className="w-full p-3 border rounded-md"
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
                    <select {...register("bloodGroup")}
                        defaultValue={donation?.bloodGroup}
                        className="w-full p-3 border rounded-md">
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
                            defaultValue={donation?.time}
                            className="w-full p-3 border rounded-md"
                        />
                    </div>
                </div>

                {/* Request Message */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Request Message</label>
                    <textarea
                        {...register("message")}
                        defaultValue={donation?.message}
                        placeholder="Write your message here..."
                        rows="4"
                        className="w-full p-3 border rounded-md"
                    ></textarea>
                </div>
                {/* Action Buttons */}
                <div className="text-center space-x-4 mt-6">
                    <button
                        type="submit"
                        className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                    >
                        Update Donation Request
                    </button>
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonationRequestEdit;