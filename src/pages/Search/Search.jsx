import { useQuery } from "@tanstack/react-query";
import usePublic from "../../Hook/usePublic";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Search = () => {
    const axiosPublic = usePublic();
    const [donors, setDonors] = useState([])
    const { data: upazilas } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upazila')
            return res.data;
        }
    })
    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data;
        }
    })
    const { data: districts } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/district')
            return res.data;
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const bloodGroup = form.get('bloodGroup');
        const district = form.get('district');
        const upazila = form.get('upazila');
    
        const filterDonors = users.filter(donor => 
            donor.bloodGroup === bloodGroup &&
            donor.district === district &&
            donor.upazila === upazila
        );
        setDonors(filterDonors);
        e.target.reset()
    };
    

    return (
        <section className="py-[58px] px-5 bg-red-50">
            <Helmet>
                <title>Search || BloodBanker</title>
            </Helmet>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-red-400 text-center mb-6">
                    Search Donors
                </h2>
                <p className="text-center text-lg text-gray-700 mb-10">
                    Find blood donors in your area by selecting the appropriate options below.
                </p>

                {/* Search Form */}
                <form className="bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Blood Group Selector */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Blood Group</label>
                            <select
                                name="bloodGroup"
                                // value={formData.bloodGroup}
                                // onChange={handleChange}
                                className="select select-bordered w-full"
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
                                // value={formData.district}
                                // onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select District</option>
                                {
                                    districts?.map((district, idx) => <option key={idx} value={district.name}>{district.name}</option>)
                                }
                            </select>
                        </div>

                        {/* Upazila Selector */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Upazila</label>
                            <select
                                name="upazila"
                                // value={formData.upazila}
                                // onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Upazila</option>
                                {
                                    upazilas?.map(u => <option key={u.id} value={u.name}>{u.name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn bg-red-400 hover:bg-red-600 text-white w-full"
                    >
                        Search
                    </button>
                </form>

                {/* Donor List */}
                <div className="mt-10">
                    {donors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {donors.map((donor, index) => (
                                <div
                                    key={index}
                                    className="p-5 bg-white rounded-lg shadow-md border border-gray-200"
                                >
                                    <h3 className="text-xl font-semibold text-red-400">
                                        {donor?.name}
                                    </h3>
                                    <p className="text-gray-700">
                                        <strong>Blood Group:</strong> {donor?.bloodGroup}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>District:</strong> {donor?.district}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Upazila:</strong> {donor?.upazila}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg text-gray-700">
                            No donors found. Please refine your search.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Search;