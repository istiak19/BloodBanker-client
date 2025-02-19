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

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    const plainTextContent = stripHtmlTags(content);
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        const res = await axiosPublic.post(image_api, formData);

        const blogInfo = {
            title: data.title,
            photo: res.data.data.url,
            content: plainTextContent,
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
            navigate('/dashboard/content-management');
        }
    };

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-red-50 text-gray-800'} p-5`}>
            <Helmet>
                <title>AddBlog | BloodBanker</title>
            </Helmet>
            <h3 className="text-center text-2xl font-bold pb-4">Add Blog</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            {...register("title")}
                            className={`input input-bordered w-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
                            required
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl font-semibold">Thumbnail Image</span>
                        </label>
                        <label htmlFor="photo" className="flex items-center px-2 py-2 text-center border rounded-lg cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <input type="file" name="photo" {...register("photo")} id="photo" />
                        </label>
                    </div>
                </div>
                <div className="mt-3">
                    <label className="text-xl font-semibold">Content:</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { }}
                    />
                </div>
                <button type="submit" className={`btn ${isDarkMode ? 'bg-red-400 text-white' : 'bg-red-500 text-white'} mt-4`}>
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default AddBlog;