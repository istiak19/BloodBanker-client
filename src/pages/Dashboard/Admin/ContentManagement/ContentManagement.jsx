import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../../../Hook/useAuth";
import usePublic from "../../../../Hook/usePublic";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = usePublic();
  const [content, setContent] = useState('');
  const { user, isDarkMode } = useAuth();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const res = await axiosPublic.get('/blog');
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

  const filterBlog = blogs.filter(blog => content === '' || blog?.status === content);

  const handlePublish = async (id) => {
    const res = await axiosSecure.patch(`/blog/${id}`, { status: 'published' });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Blog Published Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    }
  };

  const handleUnpublish = async (id) => {
    const res = await axiosSecure.patch(`/blog/${id}`, { status: 'draft' });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Blog Unpublished Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/blog/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Blog Deleted Successfully",
            icon: "success"
          });
          refetch();
        }
      }
    });
  };

  return (
    <div className="min-h-screen p-4">
      <Helmet>
        <title>Manage Blogs | BloodBanker</title>
      </Helmet>

      {/* Header Section */}
      <h3 className="text-2xl text-center font-bold mb-6">Manage Blogs</h3>

      <div className="flex justify-between items-center">
        {/* Filter Section */}
        <div className="mb-6">
          <select
            onChange={e => setContent(e.target.value)}
            className={`select select-bordered w-full md:max-w-xs ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <option value="">All Blog Posts</option>
            <option value="draft">Drafted</option>
            <option value="published">Published</option>
          </select>
        </div>

        <Link to='/dashboard/content-management/add-blog' className="btn bg-red-500 hover:bg-red-600 text-white border-none px-8 rounded-md">
          Create Blog
        </Link>
      </div>

      {/* Blog Table */}
      <div className="overflow-x-auto border-y-2 border-red-600 rounded-lg shadow-md">
        <table className={`table w-full ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
          <thead className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100 text-black"}`}>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              {users?.role === "Admin" && <th>Manage</th>}
            </tr>
          </thead>
          <tbody>
            {filterBlog.length > 0 ? (
              filterBlog.map((blog, idx) => (
                <tr key={blog._id}>
                  <td>{idx + 1}</td>
                  <td className="font-semibold">{blog.title}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {blog.status === "published" ? "Published" : "Drafted"}
                    </span>
                  </td>
                  {users?.role === "Admin" && (
                    <td className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      {blog.status === "draft" && (
                        <button
                          onClick={() => handlePublish(blog._id)}
                          className="btn btn-xs bg-green-500 hover:bg-green-600 text-white"
                        >
                          Publish
                        </button>
                      )}
                      {blog.status === "published" && (
                        <button
                          onClick={() => handleUnpublish(blog._id)}
                          className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          Unpublish
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="btn btn-xs bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400">
                  No blog posts found. Please create a new blog!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;