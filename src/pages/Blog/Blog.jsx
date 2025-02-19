import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import usePublic from '../../Hook/usePublic';
import { Helmet } from 'react-helmet-async';
import useAuth from "../../Hook/useAuth";

const Blog = () => {
    const axiosPublic = usePublic();
    const { isDarkMode } = useAuth();
    const { data } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        },
    });

    const blogs = data?.filter(blog => blog?.status === 'published');

    return (
        <div
            className={`p-12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 
            ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}
        >
            <Helmet>
                <title>Blog | BloodBanker</title>
            </Helmet>
            {
                blogs?.map(blog => (
                    <div key={blog?._id} className={`card shadow-xl border ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-red-300 bg-red-50'}`}>
                        <figure>
                            <img
                                src={blog?.photo}
                                alt="Blog Thumbnail"
                                className="w-full h-64 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-xl md:text-2xl">{blog?.title}</h2>
                            <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{blog?.content || 'Read more to learn about this blog...'}</p>
                            <div className="card-actions mt-4">
                                <Link to={`/blog/${blog._id}`} className="btn bg-red-400 text-white hover:bg-red-500">
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Blog;