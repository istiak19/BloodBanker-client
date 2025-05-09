import { FaCalendarAlt } from 'react-icons/fa';
import useAuth from '../../Hook/useAuth';
import usePublic from '../../Hook/usePublic';
import { useQuery } from '@tanstack/react-query';
import { BiCategory } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const BlogSection = () => {
    const axiosPublic = usePublic();
    const { isDarkMode } = useAuth();
    const { data } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        },
    });

    const blogs = data?.filter(blog => blog?.status === 'published').slice(0, 3);

    return (
        <section className={`py-16 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-red-100 via-pink-100 to-white'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Stay Connected: News, Events & Blood Drive Updates
                    </h2>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get the latest news, upcoming blood drive schedules, donation tips, and inspiring donor stories.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogs?.map(blog => (
                        <motion.div
                            key={blog._id}
                            whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                            className={`rounded-2xl overflow-hidden bg-opacity-90 backdrop-blur-md transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                        >
                            <div className="relative group">
                                <img
                                    src={blog?.photo}
                                    alt={blog?.title}
                                    className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Optional: slight dark overlay */}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                            </div>

                            <div className={`p-6 flex flex-col justify-between ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                <div>
                                    <div className="flex justify-between items-center mb-3 text-sm">
                                        <p className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <FaCalendarAlt /> {blog?.date}
                                        </p>
                                        <p className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <BiCategory /> {blog?.category}
                                        </p>
                                    </div>

                                    <h3 className="text-2xl font-semibold mb-4 hover:text-red-500 transition-all cursor-pointer">
                                        {blog?.title}
                                    </h3>

                                    <p className={`text-base text-justify leading-relaxed mb-6 line-clamp-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {blog?.content}
                                    </p>
                                </div>

                                <div>
                                    <Link to="/blog" className={`inline-block text-sm font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'} hover:underline`}>
                                       <span className='flex items-center mr-2 justify-center'> Read More <GoArrowUpRight /></span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;