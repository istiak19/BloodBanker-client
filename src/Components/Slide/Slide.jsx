import { Link } from "react-router-dom";
import { FaUserPlus, FaSearch } from "react-icons/fa";

const Slide = ({ text, image }) => {
    return (
        <div className="relative w-full h-[400px] flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Content */}
            <div className="relative z-10 text-center bg-white/60 p-6 rounded-xl shadow-lg">
                <h1 className="text-2xl font-semibold text-red-600 lg:text-4xl">
                    {text}
                </h1>
                <br />
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/login"
                        className="flex items-center gap-2 px-6 py-2 text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-all border border-white/70"
                    >
                        <FaUserPlus className="text-lg" />
                        Join as a Donor
                    </Link>
                    <Link
                        to="/search"
                        className="flex items-center gap-2 px-6 py-2 text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-all border border-white/70"
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