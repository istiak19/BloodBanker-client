import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import usePublic from '../../Hook/usePublic';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
    const axiosPublic = usePublic();
    const { data } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        },
    });

    const blogs = data?.filter(blog => blog?.status === 'published');

    return (
        <div className="w-11/12 mt-28 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Helmet>
                <title>Blog || BloodBanker</title>
            </Helmet>
            {
                blogs?.map(blog => (
                    <div key={blog?._id} className="card bg-red-50 shadow-xl border border-red-300">
                        <figure>
                            <img
                                src={blog?.photo}
                                alt="Blog Thumbnail"
                                className="w-full h-64 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{blog?.title}</h2>
                            <p className="text-gray-600">{blog?.content || 'Read more to learn about this blog...'}</p>
                            <div className="card-actions">
                                <Link to={`/blog/${blog._id}`} className="btn bg-red-400 text-white">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Blog;