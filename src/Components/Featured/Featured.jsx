import { FaHandsHelping, FaHeartbeat, FaUserFriends } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import useAuth from '../../Hook/useAuth';

// Only pass icon COMPONENTS, not JSX elements
const features = [
    {
        icon: FaHeartbeat,
        title: 'Save Lives Instantly',
        description: 'Your single blood donation can save multiple lives in critical need. Be the hero someone is praying for today through BloodBanker.',
    },
    {
        icon: FaHandsHelping,
        title: 'Empower Donation Drives',
        description: 'Support nationwide blood campaigns, help hospitals maintain supplies, and contribute to emergency response efforts with BloodBanker.',
    },
    {
        icon: FaUserFriends,
        title: 'Be Part of a Life-Saving Community',
        description: 'Join thousands of compassionate donors and volunteers committed to making blood accessible whenever and wherever it’s needed.',
    },
];

const Featured = () => {
    const { isDarkMode } = useAuth();

    return (
        <section className={`${isDarkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-br from-red-100 via-red-200 to-red-300"} py-12 px-6 transition-colors duration-700`}>
            <div className="max-w-7xl mx-auto text-center">
                {/* Typing Heading */}
                <h2 className={`text-4xl font-semibold mb-8 leading-tight ${isDarkMode ? "text-red-400" : "text-red-500"}`}>
                    <Typewriter
                        words={['Why Join BloodBanker?', 'Save Lives Instantly', 'Empower Communities']}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={80}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
                </h2>

                <p className={`text-lg mb-16 max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    BloodBanker connects compassionate donors with people who urgently need life-saving blood. Here’s why you should be a part of this life-changing mission:
                </p>

                {/* Features */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className={`relative flex flex-col items-center text-center p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden 
                                ${isDarkMode ? "bg-white/5 backdrop-blur-md text-gray-200 border border-gray-700" : "bg-white bg-opacity-90 text-gray-800"}`}
                            >
                                {/* Hover gradient effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-400 to-pink-500 opacity-0 hover:opacity-20 transition-all duration-500 z-0"></div>

                                <div className="relative z-10 flex flex-col items-center">
                                    <Icon className="text-6xl mb-6 text-red-400" />
                                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                    <p className="text-base leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Featured;