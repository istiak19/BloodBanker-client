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
            title: "Thank you for reaching out! We'll get back to you soon.",
            showConfirmButton: false,
            timer: 2000
        });
        e.target.reset();
    };

    return (
        <section className={`py-20 px-6 ${isDarkMode ? 'bg-gray-950 text-gray-200' : 'bg-red-50 text-gray-900'}`}>
            <Helmet>
                <title>Contact | BloodBanker</title>
            </Helmet>

            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-red-500 mb-4">
                    Contact Us
                </h2>
                <p className="text-center text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                    Need help or have a question? We'd love to hear from you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className={`p-8 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                        <h3 className="text-2xl font-bold mb-6 text-center">
                            Send Us a Message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-red-400' : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-red-400'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-red-400' : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-red-400'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Write your message..."
                                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-red-400' : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-red-400'}`}
                                    required
                                ></textarea>
                            </div>

                            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className={`flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                        <h3 className="text-2xl font-bold mb-6">
                            Get In Touch
                        </h3>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                            We are available for your assistance from Monday to Friday, 9:00 AM to 6:00 PM.
                        </p>
                        <div className="flex items-center gap-4 mb-2 text-xl text-red-500">
                            <FaPhoneAlt />
                            <span className="font-semibold">+880 1234567890</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            Customer Support Hotline
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;