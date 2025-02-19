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
    <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-red-50 text-gray-900"}>
      <Helmet>
        <title>Content Management | BloodBanker</title>
      </Helmet>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Content Management</h3>
        <Link to='/dashboard/content-management/add-blog' className="btn bg-red-400 text-white">
          Add Blog
        </Link>
      </div>

      {/* Filter dropdown */}
      <div className="mb-4">
        <select onChange={e => setContent(e.target.value)} className={`select select-bordered w-full max-w-xs ${isDarkMode ? "bg-gray-900" : "bg-red-50"}`}>
          <option value="">All Blogs</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
      {/* Blog list */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            {
              users?.role === "Admin" && <th>Action</th>
            }
          </thead>
          <tbody>
            {
              filterBlog.map((blog, idx) => (
                <tr key={blog._id}>
                  <td>{idx + 1}</td>
                  <td>{blog.title}</td>
                  <td>{blog.status}</td>
                  <td className="space-x-2">
                    {/* Only show the Admin */}
                    {
                      users?.role === "Admin" && blog.status === "draft" && (
                        <button
                          className={`btn btn-sm ${isDarkMode ? "bg-green-600 hover:bg-green-500" : "bg-green-400 hover:bg-green-300"} text-white`}
                          onClick={() => handlePublish(blog._id)}
                        >
                          Publish
                        </button>
                      )
                    }
                    {
                      users?.role === "Admin" && blog.status === "published" && (
                        <button
                          className={`btn btn-sm ${isDarkMode ? "bg-red-600 hover:bg-red-500" : "bg-red-400 hover:bg-red-300"} text-white`}
                          onClick={() => handleUnpublish(blog._id)}
                        >
                          Unpublish
                        </button>
                      )
                    }
                    {
                      users?.role === "Admin" && (
                        <button
                          className={`btn btn-sm ${isDarkMode ? "bg-red-600 hover:bg-red-500" : "bg-red-400 hover:bg-red-300"} text-white`}
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      )
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;