import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import usePublic from "../../Hook/usePublic";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hook/useAuth";

const BlogDetails = () => {
    const { id } = useParams();
    const { isDarkMode } = useAuth();
    const axiosPublic = usePublic();
    const { data: blog } = useQuery({
        queryKey: ['blogDetails'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blog/${id}`)
            return res.data;
        }
    });

    return (
        <div className={`w-full pt-16 pb-10 px-80 
            ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-red-50 text-gray-800'}`}>
            <Helmet>
                <title>BlogDetails | BloodBanker</title>
            </Helmet>
            <div className={`card shadow-md hover:shadow-xl rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-red-50 border-red-300'}`}>
                <figure>
                    <img
                        src={blog?.photo}
                        alt={blog?.title}
                        className="w-full h-80 object-cover"
                    />
                </figure>
                <div className="card-body p-6">
                    <h2 className="text-3xl font-bold">{blog?.title}</h2>
                    <p className="text-gray-600 mt-4">{blog?.content}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;