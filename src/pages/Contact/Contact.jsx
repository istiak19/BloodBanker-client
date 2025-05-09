import { Helmet } from 'react-helmet-async';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from "../../Hook/useAuth";

const Contact = () => {
    const { isDarkMode } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const message = e.target.message.value.trim();

        if (!name || !email || !message) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "All fields are required!",
                showConfirmButton: true,
                timer: 2000,
            });
            return;
        }

        Swal.fire({
            position: "top",
            icon: "success",
            title: "Thank you for reaching out! We'll get back to you soon.",
            showConfirmButton: false,
            timer: 2000,
        });
        e.target.reset();
    };

    const inputStyles = `w-full rounded-xl border px-5 py-3 text-lg focus:outline-none focus:ring-2 transition ${isDarkMode
        ? 'bg-gray-800 text-white border-gray-600 focus:ring-red-400 placeholder-gray-400'
        : 'bg-white text-gray-800 border-gray-300 focus:ring-red-400 placeholder-gray-500'
        }`;

    const faqData = [
        { q: "🩸 Who can donate blood?", a: "Anyone aged 18-65 years, weighing over 50kg, and in good health can donate." },
        { q: "🩸 How often can I donate?", a: "Whole blood donation is recommended once every 3 months." },
        { q: "🩸 Is blood donation safe?", a: "Yes, it’s completely safe. New sterile equipment is used for each donor." },
    ];

    return (
        <section className={`py-16 px-4 sm:px-6 md:px-8 ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gradient-to-r from-red-50 via-red-100 to-red-200 text-gray-900'}`}>
            <Helmet>
                <title>Contact | BloodBanker</title>
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">Contact Us</h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-400">
                        Need help or have a question? BloodBanker connects lifesavers across Bangladesh.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Address */}
                    <div className="md:w-1/2 space-y-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <h2 className={`text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                    Contact <span className="text-red-500">Info</span>
                                </h2>
                                <span className="w-16 h-1 bg-red-500 inline-block"></span>
                            </div>
                            <p className="text-sm tracking-wide uppercase !text-gray-600 dark:text-gray-400">
                                We are glad to have you around.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Contact Info Items */}
                            {[
                                { icon: <FaPhoneAlt />, title: "Phone", detail: "+880 1234 567 890" },
                                { icon: <FaEnvelope />, title: "Email", detail: "support@bloodbanker.com" },
                                { icon: <FaClock />, title: "Timings", detail: "Sun-Thu: 9AM-6PM | Sat: 10AM-2PM" },
                                { icon: <FaMapMarkerAlt />, title: "Address", detail: "1234 Teal Street, Green City, Dhaka" }
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <p className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-gray-100' : 'text-black'}`}>
                                        {item.icon} {item.title}
                                    </p>
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.detail}</p>
                                    {idx !== 3 && <hr className="border-dashed border-gray-400 my-6 dark:border-gray-700 space-y-5" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px bg-gray-400 dark:bg-gray-600"></div>

                    {/* Contact Form */}
                    <div className="md:w-1/2 space-y-8">
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3">
                                <h2 className={`text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                    Enquiry <span className="text-red-500">Form</span>
                                </h2>
                                <span className="w-16 h-1 bg-red-500 inline-block"></span>
                            </div>
                            <p className="text-sm tracking-wide uppercase !text-gray-700 dark:text-gray-400">
                                Get in Touch
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Name</label>
                                <input type="text" id="name" name="name" placeholder="Your name" className={inputStyles} required />
                            </div>
                            <div>
                                <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Email</label>
                                <input type="email" id="email" name="email" placeholder="Your email" className={inputStyles} required />
                            </div>
                            <div>
                                <label htmlFor="message" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Message</label>
                                <textarea id="message" name="message" rows="5" placeholder="Write your message..." className={inputStyles} required></textarea>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="callback" className="accent-red-500" />
                                <label htmlFor="callback" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>Request a Callback</label>
                            </div>
                            <button type="submit" className="w-full py-3 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-pink-500 to-red-400 hover:from-red-400 hover:to-pink-500 transition duration-300 shadow-lg active:scale-95">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Google Map */}
                <div className="mt-24">
                    <h3 className="text-3xl font-bold text-center mb-8 text-red-500">Find Us on the Map</h3>
                    <div className="rounded-xl overflow-hidden shadow-2xl w-full h-[400px]">
                        <iframe
                            title="BloodBanker Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902759740072!2d90.39150921498213!3d23.75090379459971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b891c4cf5a0d%3A0x6cf72b75b6b6c660!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1715243466902!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24">
                    <h3 className="text-3xl font-bold text-center mb-8 text-red-500">Frequently Asked Questions</h3>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {faqData.map((item, idx) => (
                            <div key={idx} className={`collapse collapse-plus ${isDarkMode ? 'bg-gray-800' : 'bg-red-50'} border border-gray-200 dark:border-gray-700 rounded-xl`}>
                                <input type="radio" name={`faq-${idx}`} defaultChecked={idx === 0} />
                                <div className={`collapse-title font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                    {item.q}
                                </div>
                                <div className={`collapse-content font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {item.a}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;