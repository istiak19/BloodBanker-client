import React from 'react';
import { FaHandsHelping, FaHeartbeat, FaUserFriends } from 'react-icons/fa';

const Featured = () => {
    return (
        <section className="bg-red-100 py-16 px-5">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-red-400 mb-6">
                    Why Join Us?
                </h2>
                <p className="text-lg text-gray-700 mb-12">
                    We connect donors with those in need, fostering a community where saving lives is just a donation away. Here's why you should be part of our mission:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div className="text-red-400 text-5xl mb-4">
                            <FaHeartbeat />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Save Lives</h3>
                        <p className="text-gray-600">
                            Your blood donation can save up to three lives. Join our life-saving mission and make a real impact in your community.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div className="text-red-400 text-5xl mb-4">
                            <FaHandsHelping />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Support Campaigns</h3>
                        <p className="text-gray-600">
                            Contribute to blood donation campaigns near you or start your own to help hospitals and emergency centers meet urgent needs.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                        <div className="text-red-400 text-5xl mb-4">
                            <FaUserFriends />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Join a Community</h3>
                        <p className="text-gray-600">
                            Be part of a community of donors and volunteers working together to make a difference, one drop at a time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;