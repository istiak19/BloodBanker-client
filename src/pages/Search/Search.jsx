import { useQuery } from "@tanstack/react-query";
import usePublic from "../../Hook/usePublic";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hook/useAuth";

const Search = () => {
    const axiosPublic = usePublic();
    const { isDarkMode } = useAuth();
    const [donors, setDonors] = useState([]);

    const { data: upazilas } = useQuery({
        queryKey: ["upazilas"],
        queryFn: async () => {
            const res = await axiosPublic.get("/upazila");
            return res.data;
        },
    });

    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get("/users");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const bloodGroup = form.get("bloodGroup");
        const district = form.get("district");
        const upazila = form.get("upazila");

        const filterDonors = users.filter(
            (donor) =>
                donor.bloodGroup === bloodGroup &&
                donor.district === district &&
                donor.upazila === upazila
        );
        setDonors(filterDonors);
        e.target.reset();
    };

    return (
        <section className={`py-14 px-5 ${isDarkMode ? "bg-gray-900 text-white" : "bg-red-50 text-gray-900"}`}>
            <Helmet>
                <title>Search | BloodBanker</title>
            </Helmet>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-red-400 text-center mb-6">
                    Search Donors
                </h2>
                <p className="text-center text-lg mb-10">
                    Find blood donors in your area by selecting the appropriate options below.
                </p>
                {/* Search Form */}
                <form className={`p-8 rounded-lg shadow-md space-y-6 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white"}`} onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Blood Group Selector */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Blood Group</label>
                            <select
                                name="bloodGroup"
                                className={`select select-bordered w-full ${isDarkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-gray-900 border-gray-300"}`}
                            >
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
                        {/* District Selector */}
                        <div>
                            <label className="block text-sm font-medium mb-2">District</label>
                            <select
                                name="district"
                                className={`select select-bordered w-full ${isDarkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-gray-900 border-gray-300"}`}
                            >
                                <option value="">Select District</option>
                                {districts?.map((district, idx) => (
                                    <option key={idx} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Upazila Selector */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Upazila</label>
                            <select
                                name="upazila"
                                className={`select select-bordered w-full ${isDarkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-gray-900 border-gray-300"}`}
                            >
                                <option value="">Select Upazila</option>
                                {upazilas?.map((u) => (
                                    <option key={u.id} value={u.name}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn bg-red-400 hover:bg-red-600 text-white w-full">
                        Search
                    </button>
                </form>
                {/* Donor List */}
                <div className="mt-10">
                    {
                        donors.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {
                                    donors.map((donor, index) => (
                                        <div
                                            key={index}
                                            className={`p-5 rounded-lg shadow-md border ${isDarkMode ? "bg-gray-700 border-gray-500" : "bg-white border-gray-200"}`}
                                        >
                                            <h3 className="text-xl font-semibold text-red-400">{donor?.name}</h3>
                                            <p>
                                                <strong>Blood Group:</strong> {donor?.bloodGroup}
                                            </p>
                                            <p>
                                                <strong>District:</strong> {donor?.district}
                                            </p>
                                            <p>
                                                <strong>Upazila:</strong> {donor?.upazila}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <p className="text-center text-lg">No donors found. Please refine your search.</p>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default Search;