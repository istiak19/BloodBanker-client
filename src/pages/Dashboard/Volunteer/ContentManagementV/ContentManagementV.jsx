import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../../../Hook/useAuth";
const ContentManagementV = () => {
    const axiosSecure = useAxiosSecure();
    const [content, setContent] = useState('');
    const { user } = useAuth();

    const { data: blogs = [], refetch } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blog');
            return res.data;
        },
    });
    const { data: users } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    console.log(users)

    const filterBlog = blogs.filter(blog => content === '' || blog?.status === content);
    console.log(content);

    const handlePublish = async (id) => {
        const res = await axiosSecure.patch(`/blog/${id}`, { status: 'published' });
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Successfully Published",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    const handleUnpublish = async (id) => {
        const res = await axiosSecure.patch(`/blog/${id}`, { status: 'draft' });
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Successfully Unpublished",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your blog will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/blog/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your blog has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    };

    return (
        <div>
            <Helmet>
                <title>Content Management || BloodBanker</title>
            </Helmet>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Content Management</h3>
                <Link to='/dashboard/content-management/add-blog' className="btn bg-red-400 text-white">
                    Add Blog
                </Link>
            </div>

            {/* Filter dropdown */}
            <div className="mb-4">
                <select onChange={e => setContent(e.target.value)} className="select select-bordered w-full max-w-xs">
                    <option value="">All Blogs</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            {/* Blog list */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterBlog.map((blog, idx) => (
                            <tr key={blog._id}>
                                <td>{idx + 1}</td>
                                <td>{blog.title}</td>
                                <td>{blog.status}</td>
                                <td>
                                    {/* Only show the following buttons for Admin */}
                                    {user?.role === "admin" && blog.status === "draft" && (
                                        <button
                                            className="btn btn-sm bg-green-400 text-white"
                                            onClick={() => handlePublish(blog._id)}
                                        >
                                            Publish
                                        </button>
                                    )}
                                    {user?.role === "admin" && blog.status === "published" && (
                                        <button
                                            className="btn btn-sm bg-red-400 text-white"
                                            onClick={() => handleUnpublish(blog._id)}
                                        >
                                            Unpublish
                                        </button>
                                    )}
                                    {/* Only show delete button for Admin */}
                                    {user?.role === "admin" && (
                                        <button
                                            className="btn btn-sm bg-red-400 text-white"
                                            onClick={() => handleDelete(blog._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContentManagementV;