import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import usePublic from "../../Hook/usePublic";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hook/useAuth";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loading from "../../Components/Loading/Loading";

const BlogDetails = () => {
    const { id } = useParams();
    const { isDarkMode } = useAuth();
    const axiosPublic = usePublic();
    const [scrollProgress, setScrollProgress] = useState(0);

    const { data: blog, isLoading } = useQuery({
        queryKey: ['blogDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blog/${id}`);
            return res.data;
        }
    });

    // Scroll progress calculation
    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-20 pb-10 px-4 container mx-auto 
            ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
            <Helmet>
                <title>{blog?.title ? `${blog.title} | BloodBanker` : 'Blog Details | BloodBanker'}</title>
            </Helmet>
            {/* Top Scroll Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-red-500 z-50" style={{ width: `${scrollProgress}%` }}></div>
            {/* Blog Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className={`card rounded-2xl overflow-hidden shadow-lg 
                ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-red-200'}`}
            >
                {/* Image */}
                <figure className="relative">
                    <img
                        src={blog?.photo}
                        alt={blog?.title}
                        className="w-full h-72 md:h-[450px] object-cover"
                    />
                    {/* Category Badge */}
                    {blog?.category && (
                        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold 
                            ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-red-100 text-red-600'}`}>
                            {blog.category}
                        </span>
                    )}
                </figure>
                {/* Content */}
                <div className="card-body px-6 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {blog?.title}
                    </h1>
                    {/* Date */}
                    {blog?.date && (
                        <p className="text-sm text-gray-400 mb-6">
                            Published on {new Date(blog?.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    )}
                    {/* Blog Content */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className={`text-base md:text-lg text-justify leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                        {blog?.content}
                    </motion.p>
                    <div>
                        <Link to='/blog' className="btn bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold hover:from-red-500 hover:to-red-400 border-none transition"> <FaArrowLeftLong  size={18} /> Back to Blogs</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogDetails;