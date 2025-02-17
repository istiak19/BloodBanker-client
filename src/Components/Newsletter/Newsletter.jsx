import { useState } from "react";
import { toast } from "react-toastify";
import { FaTint } from "react-icons/fa";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("❌ Please enter a valid email!");
            return;
        }
        toast.success("Subscribed successfully!");
        setEmail("");
    };

    return (
        <section className="bg-red-200 py-12 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                    <FaTint className="text-red-500" /> Stay Updated!
                </h2>
                <p className="mb-6 text-gray-700">
                    Subscribe to our newsletter to receive the latest updates on blood donation campaigns, health tips, and community stories.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full sm:w-80 px-4 py-3 rounded-lg text-black outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-3 transition-all"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;