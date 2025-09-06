import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../Hook/useAuth";

const reviews = [
    {
        id: 1,
        name: "Mohammad Hasan Ali",
        text: "This platform is very helpful! Finding a blood donor is very easy.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/10.jpg"
    },
    {
        id: 2,
        name: "Sabrina Sultana",
        text: "I found a blood donor in a short time. Great initiative!",
        rating: 4,
        image: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
        id: 3,
        name: "Riyad Rahman",
        text: "An amazing platform to make blood donation easier.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/30.jpg"
    },
    {
        id: 4,
        name: "Farhan Hossain",
        text: "I am very satisfied. Finding a blood donor was very easy.",
        rating: 5,
        image: "https://randomuser.me/api/portraits/men/31.jpg"
    },
    {
        id: 5,
        name: "Afrin Akter",
        text: "It was a great experience using this platform for blood donation!",
        rating: 5,
        image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
        id: 6,
        name: "Sohel Rana",
        text: "I found a blood donor quickly, it's really effective!",
        rating: 4,
        image: "https://randomuser.me/api/portraits/men/33.jpg"
    }
];

const Review = () => {
    const [index, setIndex] = useState(0);
    const { isDarkMode } = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gradient-to-r from-white via-red-50 to-red-200 text-gray-800"} py-20 px-6 md:px-10 transition-colors`}>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

                {/* Left Content */}
                <div className="text-center md:text-left">
                    <p className="text-red-600 font-semibold uppercase tracking-wider mb-3">Testimonial</p>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight">
                        Heartfelt Stories
                    </h2>
                    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-8 leading-relaxed text-justify`}>
                        BloodBanker has saved countless lives by connecting donors with patients in need. Discover the experiences shared by our wonderful community.
                    </p>
                </div>

                {/* Review Card with Animation */}
                <div className="md:col-span-2 flex justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={reviews[index].id}
                            className={`w-full max-w-xl p-8 rounded-xl shadow-2xl border-t-4 ${isDarkMode ? "bg-gradient-to-br from-gray-800 to-gray-700 border-red-500" : "bg-gradient-to-br from-white to-red-100 border-red-600"} text-center transition-all`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="italic text-lg mb-4">"{reviews[index].text}"</p>
                            <div className="flex justify-center mb-4">
                                {
                                    Array.from({ length: reviews[index].rating }).map((_, idx) => (
                                        <FaStar key={idx} className="text-yellow-400 text-xl" />
                                    ))
                                }
                            </div>
                            <img
                                src={reviews[index].image}
                                alt={reviews[index].name}
                                className="w-20 h-20 rounded-full mx-auto mt-2 border-4 border-red-400 object-cover"
                            />
                            <h3 className="mt-4 text-xl font-semibold">{reviews[index].name}</h3>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Review;