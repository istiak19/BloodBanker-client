import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import usePublic from '../../Hook/usePublic';
import { Helmet } from 'react-helmet-async';
import useAuth from "../../Hook/useAuth";
import { motion } from 'framer-motion';
import Loading from '../../Components/Loading/Loading';

const Blog = () => {
    const axiosPublic = usePublic();
    const { isDarkMode } = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        },
    });

    const blogs = data?.filter(blog => blog?.status === 'published');
    if (isLoading) return <Loading />;

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
            <Helmet>
                <title>Blog | BloodBanker</title>
            </Helmet>

            <div className="px-4 py-10 mx-auto container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {blogs?.map((blog, index) => (
                    <motion.div
                        key={blog?._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`group card rounded-2xl overflow-hidden shadow-lg border transform transition duration-300 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-red-200 bg-white'}`}
                    >
                        <figure>
                            <img
                                src={blog?.photo}
                                alt="Blog Thumbnail"
                                className="w-full h-56 object-cover group-hover:brightness-90 transition duration-300 hover:scale-105"
                            />
                        </figure>
                        <div className="card-body p-5">
                            {/* Category + Date */}
                            <div className="flex items-center justify-between text-xs mb-3">
                                <span className={`px-2 py-1 rounded-full font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-red-100 text-red-600'}`}>
                                    {blog?.category || 'General'}
                                </span>
                                <span className="text-gray-600">
                                    {new Date(blog?.date).toLocaleDateString()}
                                </span>
                            </div>
                            <h2 className="card-title text-xl md:text-2xl font-semibold mb-3">{blog?.title}</h2>
                            <p className={`text-sm md:text-base line-clamp-3 text-justify ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {blog?.content || 'Read more to learn about this blog...'}
                            </p>
                            <div className="card-actions mt-5">
                                <Link
                                    to={`/blog/${blog._id}`}
                                    className="btn w-full bg-gradient-to-r from-pink-400 to-red-500 text-white font-semibold hover:from-red-500 hover:to-pink-400 border-none transition"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Blog;