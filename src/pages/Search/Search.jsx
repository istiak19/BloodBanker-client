const Search = () => {
    return (
        <section className="py-[58px] px-5 bg-red-50">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-red-400 text-center mb-6">
                    Search Donors
                </h2>
                <p className="text-center text-lg text-gray-700 mb-10">
                    Find blood donors in your area by selecting the appropriate options below.
                </p>

                {/* Search Form */}
                <form  className="bg-white p-8 rounded-lg shadow-md space-y-6">
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
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chattogram">Chattogram</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Sylhet">Sylhet</option>
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
                                <option value="Dhanmondi">Dhanmondi</option>
                                <option value="Pahartoli">Pahartoli</option>
                                <option value="Daulatpur">Daulatpur</option>
                                <option value="Jalalabad">Jalalabad</option>
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
                    {/* {donors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {donors.map((donor, index) => (
                                <div
                                    key={index}
                                    className="p-5 bg-white rounded-lg shadow-md border border-gray-200"
                                >
                                    <h3 className="text-xl font-semibold text-red-400">
                                        {donor.name}
                                    </h3>
                                    <p className="text-gray-700">
                                        <strong>Blood Group:</strong> {donor.bloodGroup}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>District:</strong> {donor.district}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Upazila:</strong> {donor.upazila}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg text-gray-700">
                            No donors found. Please refine your search.
                        </p>
                    )} */}
                </div>
            </div>
        </section>
    );
};

export default Search;