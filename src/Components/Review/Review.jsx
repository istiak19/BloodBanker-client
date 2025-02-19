import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
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
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-red-100 text-gray-800"} pb-12 transition-colors`}>
            <div className="max-w-5xl mx-auto text-center overflow-hidden">
                <h2 className={`text-3xl font-semibold mb-6 ${isDarkMode ? "text-red-300" : "text-red-600"}`}>
                    What People Say About Us ❤️
                </h2>
                {/* Review Card with Animation */}
                <motion.div
                    key={reviews[index].id}
                    className={`w-full max-w-md md:max-w-lg mx-auto py-5 rounded-xl shadow-lg hover:shadow-2xl text-center transition-colors ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
                        }`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <p className="italic">"{reviews[index].text}"</p>
                    <div className="flex justify-center mt-3">
                        {
                            Array(reviews[index].rating)
                                .fill()
                                .map((_, idx) => (
                                    <FaStar key={idx} className="text-yellow-500 text-xl" />
                                ))
                        }
                    </div>
                    <img
                        src={reviews[index].image}
                        alt={reviews[index].name}
                        className="w-16 h-16 rounded-full mx-auto mt-4 border-2 border-red-400"
                    />
                    <h3 className="mt-2 font-semibold">{reviews[index].name}</h3>
                </motion.div>
            </div>
        </section>
    );
};

export default Review;