import { useState } from "react";
import { toast } from "react-toastify";
import { FaTint } from "react-icons/fa";
import useAuth from "../../Hook/useAuth";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const { isDarkMode } = useAuth();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter a valid email!");
            return;
        }
        toast.success("Subscribed successfully!");
        setEmail("");
    };

    return (
        <section className={`${isDarkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-r from-red-100 via-red-200 to-red-300"} py-12 px-6 text-center transition-colors duration-700`}>
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-gray-700">
                <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3 text-red-400">
                    <FaTint className="text-5xl" /> Stay Updated!
                </h2>
                <p className={`text-lg mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Subscribe to our newsletter for updates on blood donation campaigns, health tips, and inspiring community stories.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className={`w-full sm:w-80 px-5 py-3 rounded-full text-lg outline-none focus:ring-4 transition ${isDarkMode ? "bg-gray-800 text-white border border-gray-600 focus:ring-red-500/40" : "bg-white text-black border border-gray-300 focus:ring-red-300/50"}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold shadow-md hover:from-pink-500 hover:to-red-400 transition-all duration-300 px-8 border-none rounded-full py-3"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;