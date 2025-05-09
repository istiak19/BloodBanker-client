import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import usePublic from "../../../../Hook/usePublic";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hook/useAuth";

const image_key = import.meta.env.VITE_IMAGE;
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const AddBlog = () => {
    const { isDarkMode } = useAuth();
    const [content, setContent] = useState("");
    const editor = useRef(null);
    const axiosPublic = usePublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        const res = await axiosPublic.post(image_api, formData);

        const today = new Date().toISOString().split('T')[0];

        const blogInfo = {
            title: data.title,
            photo: res.data.data.url,
            content: stripHtmlTags(content),
            date: today,
            category: data.category,
            status: 'draft'
        };

        const blogRes = await axiosSecure.post('/blog', blogInfo);
        if (blogRes.data.insertedId) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Blog created successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            setContent("");
            navigate('/dashboard/content-management');
        }
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-red-50 text-gray-800'} p-8 md:p-12 rounded-lg`}>
            <Helmet>
                <title>Create Blog | BloodBanker</title>
            </Helmet>
            <h3 className="text-center text-4xl font-bold pb-6">Create a New Blog</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                    {/* Title */}
                    <div className="form-control w-full">
                        <label className="label text-lg font-semibold">
                            <span className="label-text">Blog Title</span>
                        </label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            className={`input input-bordered w-full px-4 py-2 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-md shadow-sm focus:ring-2 focus:ring-red-400`}
                        />
                    </div>

                    {/* Thumbnail Image */}
                    <div className="form-control w-full">
                        <label className="label text-lg font-semibold">
                            <span className="label-text">Upload Thumbnail</span>
                        </label>
                        <label htmlFor="photo" className="flex items-center px-4 py-2 border rounded-lg cursor-pointer text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <input type="file" {...register("photo", { required: true })} id="photo" className="hidden" />
                        </label>
                    </div>
                </div>

                {/* Category */}
                <div className="form-control w-full">
                    <label className="label text-lg font-semibold">
                        <span className="label-text">Category</span>
                    </label>
                    <select
                        {...register("category", { required: true })}
                        className={`select select-bordered w-full px-4 py-2 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-md shadow-sm focus:ring-2 focus:ring-red-400`}
                    >
                        <option value="Uncategorized">Uncategorized</option>
                        <option value="Health & Benefits">Health & Benefits</option>
                        <option value="Blood Donation Facts">Blood Donation Facts</option>
                        <option value="Events">Events</option>
                    </select>
                </div>

                {/* Blog Content */}
                <div>
                    <label className="text-lg font-semibold">Content</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1}
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={() => { }}
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className={`btn ${isDarkMode ? 'bg-red-400 text-white' : 'bg-red-500 text-white'} mt-6 hover:bg-red-600 border-none px-12 py-3 rounded-lg shadow-lg transform transition-all duration-300`}>
                        Create Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;