import { FaUsers } from 'react-icons/fa';
import statsImage from '../../assets/banner/stats.jpg';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { CiHospital1 } from 'react-icons/ci';
import { BiDonateBlood } from 'react-icons/bi';

const stats = [
    {
        id: 1,
        icon: <MdOutlineVerifiedUser size={60} className="text-red-500" />,
        value: '5',
        label: 'Years of Service',
    },
    {
        id: 2,
        icon: <FaUsers size={60} className="text-red-500" />,
        value: '1000',
        label: 'Registered Donors',
    },
    {
        id: 3,
        icon: <BiDonateBlood size={60} className="text-red-500" />,
        value: '500',
        label: 'Units Provided Monthly',
    },
    {
        id: 4,
        icon: <CiHospital1 size={60} className="text-red-500" />,
        value: '100',
        label: 'Partner Hospitals',
    },
];

const StatsSection = () => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat bg-fixed py-24 px-4 text-white dark:text-gray-200"
            style={{ backgroundImage: `url(${statsImage})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/90 dark:bg-black/70"></div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <p className="text-red-400 dark:text-red-300 font-medium mb-2">
                    Saving Lives Every Day
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Donate Blood, Save Lives
                </h2>
                <p className="text-lg text-gray-300 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                    Join our mission to make blood accessible for those in need. Every donation counts and can save precious lives.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center">
                            {stat.icon}
                            <h3 className="text-3xl font-bold mt-4">{stat.value}<span className='text-red-500'>+</span></h3>
                            <p className="mt-2 text-gray-400 dark:text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;