import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import useAuth from '../../Hook/useAuth';

const events = [
    {
        id: 1,
        image: 'https://i.ibb.co.com/9m93bxmC/2149261089.jpg',
        date: '17-08-2026',
        time: '10 am - 1 pm',
        location: 'Dhaka Medical College, Dhaka',
        title: 'Blood Donation for Independence Day',
        desc: 'Join us for a special Independence Day blood donation drive. Your contribution can help save lives in the most critical moments.',
    },
    {
        id: 2,
        image: 'https://i.ibb.co.com/nq6D4Rdd/2149261090.jpg',
        date: '17-11-2025',
        time: '10 am - 1 pm',
        location: 'Chittagong Medical College, Chittagong',
        title: 'Woman International Day Blood Donation',
        desc: 'Celebrate Woman International Day by donating blood. Your generous act of kindness will help empower women in need of vital medical resources.',
    },
    {
        id: 3,
        image: 'https://i.ibb.co.com/6cRzrcHV/2149870280.jpg',
        date: '09-08-2025',
        time: '10 am - 1 pm',
        location: 'Rajshahi Medical College, Rajshahi',
        title: 'August Blood Donation Regular Event',
        desc: 'Our regular blood donation event. Every drop counts in ensuring the availability of blood for those in urgent need.',
    },
];

export default function EventsSection() {
    const { isDarkMode } = useAuth();

    return (
        <section className={`${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gradient-to-r from-red-100 via-red-200 to-red-300"} py-8 md:py-12 px-4 transition-colors`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <p className="text-red-600 font-semibold uppercase tracking-wide text-lg">Upcoming Events</p>
                        <h2 className={`${isDarkMode ? "text-gray-200" : "text-gray-800"} text-3xl md:text-4xl font-extrabold leading-tight`}>Don’t Miss Out! Upcoming Blood <br /> Donation Events</h2>
                    </div>
                    <button
                        className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold shadow-md hover:from-pink-500 hover:to-red-400 transition-all duration-300 px-6 border-none rounded-full btn"
                        aria-label="View more blood donation events"
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    >
                        View More
                    </button>
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {events.length === 0 ? (
                        <div className="w-full h-64 bg-gray-300 animate-pulse rounded-t-lg"></div>
                    ) : (
                        events.map((event) => (
                            <div
                                key={event.id}
                                className={`bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 ${isDarkMode ? "bg-gray-800 text-gray-200" : ""}`}
                            >
                                <img
                                    src={event.image}
                                    alt={`Image for ${event.title}`}
                                    className="w-full h-64 object-cover rounded-t-lg"
                                />

                                <div className={`${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-red-700 text-gray-200"} flex justify-between px-4 py-4 text-sm rounded-b-lg`}>
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaClock />
                                        <span>{event.time}</span>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className={`${isDarkMode ? "text-gray-400" : "text-red-600"} flex items-center gap-2 text-sm mb-2`}>
                                        <FaMapMarkerAlt />
                                        <span>{event.location}</span>
                                    </div>
                                    <h3 className={`${isDarkMode ? "text-gray-200" : "text-gray-800"} text-2xl font-semibold mb-3`}>{event.title}</h3>
                                    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-700"} text-justify text-base leading-relaxed`}>{event.desc}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}