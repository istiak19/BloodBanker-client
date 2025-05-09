import { FaCalendarAlt } from 'react-icons/fa';
import useAuth from '../../Hook/useAuth';
import usePublic from '../../Hook/usePublic';
import { useQuery } from '@tanstack/react-query';
import { BiCategory } from 'react-icons/bi';

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

    // Filter published blogs and limit to the first 3
    const blogs = data?.filter(blog => blog?.status === 'published').slice(0, 3);

    return (
        <section className={`py-10 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                    <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Stay Connected: News, Events & Blood Drive Updates
                    </h2>
                    <p className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get the latest news, upcoming blood drive schedules, donation tips, and inspiring donor stories from BloodBanker.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogs?.map(blog => (
                        <div key={blog._id} className={`shadow-lg rounded-lg overflow-hidden h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            {/* Hover effect applied only to the image */}
                            <div className="relative">
                                <img
                                    src={blog?.photo}
                                    alt={blog?.title}
                                    className="w-full h-48 object-cover rounded-t-lg transition-all transform hover:scale-105 hover:shadow-2xl"
                                />
                            </div>
                            <div className={`p-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                <div className="flex justify-between items-center mb-4">
                                    <p className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <FaCalendarAlt className="mr-2" />
                                        <span>{blog?.date}</span>
                                    </p>
                                    <p className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <BiCategory className="mr-2" />
                                        {blog?.category}
                                    </p>
                                </div>

                                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {blog?.title}
                                </h3>

                                <p className={`mb-4 text-justify ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
                                    {blog?.content}
                                </p>

                                <div className="mt-4">
                                    <a href="/blog" className={`text-sm font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'} hover:underline transition-all`}>
                                        Read More →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;