import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPhoneAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from "../../Hook/useAuth";

const Contact = () => {
    const { isDarkMode } = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            position: "top",
            icon: "success",
            title: "Thank you for reaching out! We will get back to you soon.",
            showConfirmButton: false,
            timer: 1500
        });
        e.target.reset()
    };

    return (
        <section className={`py-16 px-5 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-red-100 text-gray-800'}`}>
            <Helmet>
                <title>Contact | BloodBanker</title>
            </Helmet>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-red-400 text-center mb-6">
                    Contact Us
                </h2>
                <p className="text-lg text-center mb-12">
                    Have questions or need assistance? Reach out to us using the form below or give us a call.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className={`p-8 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
                        <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    rows="4"
                                    placeholder="Your Message"
                                    className={`textarea textarea-bordered w-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
                                    required
                                ></textarea>
                            </div>
                            <button className="btn bg-red-400 hover:bg-red-500 text-white w-full">
                                Submit
                            </button>
                        </form>
                    </div>
                    {/* Contact Information */}
                    <div className={`p-8 rounded-lg shadow-md flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
                        <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                        <p className="text-lg mb-4">
                            We're here to help! Feel free to reach out to us via phone.
                        </p>
                        <div className="flex items-center text-red-400 text-xl mb-2">
                            <FaPhoneAlt className="mr-2" />
                            <span>+880 1234567890</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Our team is available Monday to Friday, 9:00 AM - 6:00 PM.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;