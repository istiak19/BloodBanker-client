import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import usePublic from "../../Hook/usePublic";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
    const { id } = useParams();
    const axiosPublic = usePublic();
    const { data: blog } = useQuery({
        queryKey: ['blogDetails'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blog/${id}`)
            return res.data;
        }
    })
    return (
        <div className="max-w-4xl mx-auto mt-28 border rounded-lg">
            <Helmet>
                <title>BlogDetails || BloodBanker</title>
            </Helmet>
            <div className="card shadow-xl">
                <figure>
                    <img
                        src={blog?.photo}
                        alt={blog?.title}
                        className="w-full h-80 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="text-3xl font-bold">{blog?.title}</h2>
                    <p className="text-gray-600 mt-4">{blog?.content}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;