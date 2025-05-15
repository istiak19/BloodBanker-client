import { Link } from "react-router-dom";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import useAuth from "../../Hook/useAuth";

const Slide = ({ text, image }) => {
    const { isDarkMode } = useAuth();

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            {/* Overlay */}
            <div className={`absolute inset-0 ${isDarkMode ? "bg-black opacity-70" : "bg-black opacity-50"}`}></div>
            {/* Content */}
            <div className={`relative z-10 text-center p-6 rounded-xl shadow-lg ${isDarkMode ? "bg-gray-800 text-white border-none" : "bg-white/60 text-gray-900 border border-red-600 border-x-4"}`}>
                <h1 className={`text-2xl font-semibold lg:text-4xl ${isDarkMode ? "text-red-400" : "text-red-600"}`}>
                    {text}
                </h1>
                <br />
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/dashboard/donorHome"
                        className="flex items-center gap-2 btn px-6 py-2 rounded-full shadow-lg transition-all border border-white/70 text-white bg-gradient-to-r from-pink-500 to-red-400 hover:from-red-400 hover:border-none hover:to-pink-500"
                    >
                        <FaUserPlus className="text-lg" />
                        Join as a Donor
                    </Link>
                    <Link
                        to="/search"
                        className="flex items-center gap-2 btn px-6 py-2 rounded-full shadow-lg transition-all border border-white/70 text-white bg-gradient-to-r from-pink-500 to-red-400 hover:from-red-400 hover:border-none hover:to-pink-500"
                    >
                        <FaSearch className="text-lg" />
                        Search Donors
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Slide;