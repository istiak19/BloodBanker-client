import React from 'react';
import { FaHandsHelping, FaHeartbeat, FaUserFriends } from 'react-icons/fa';
import useAuth from '../../Hook/useAuth';

const Featured = () => {
    const { isDarkMode } = useAuth();
    return (
        <section className={`${isDarkMode ? "bg-gray-900" : "bg-red-100"} py-12 px-5 transition-colors`}>
            <div className="max-w-6xl mx-auto text-center">
                <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? "text-red-300" : "text-red-400"}`}>
                    Why Join Us?
                </h2>
                <p className={`text-lg mb-12 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    We connect donors with those in need, fostering a community where saving lives is just a donation away. Here's why you should be part of our mission:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className={`p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"}`}>
                        <div className="text-red-400 text-5xl mb-4">
                            <FaHeartbeat />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Save Lives</h3>
                        <p>
                            Your blood donation can save up to three lives. Join our life-saving mission and make a real impact in your community.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className={`p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"}`}>
                        <div className="text-red-400 text-5xl mb-4">
                            <FaHandsHelping />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Support Campaigns</h3>
                        <p>
                            Contribute to blood donation campaigns near you or start your own to help hospitals and emergency centers meet urgent needs.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className={`p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"}`}>
                        <div className="text-red-400 text-5xl mb-4">
                            <FaUserFriends />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Join a Community</h3>
                        <p>
                            Be part of a community of donors and volunteers working together to make a difference, one drop at a time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;