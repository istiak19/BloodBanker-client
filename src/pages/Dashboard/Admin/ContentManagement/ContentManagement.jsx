import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [content, setContent] = useState('');
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ['blog'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blog');
      return res.data;
    },
  });

  const filterBlog = blogs.filter(blog => content === '' || blog?.status === content);

  const handlePublish = async (id) => {
    const res = await axiosSecure.patch(`/blog/${id}`, { status: 'published' })
    console.log(res.data)
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully Publish",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    }
  };

  const handleUnpublish = async (id) => {
    const res = await axiosSecure.patch(`/blog/${id}`, { status: 'draft' })
    console.log(res.data)
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully Unpublish",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    }
  };

  const handleDelete = async (id) => {
    console.log(id)
    const res = await axiosSecure.delete(`/blog/${id}`)
    if (res.data.deletedCount > 0) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully blog delete",
        showConfirmButton: false,
        timer: 1500
      });
      refetch();
    }
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
          <option value="all">All Blogs</option>
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
                  {blog.status === "draft" && (
                    <button
                      className="btn btn-sm bg-green-400 text-white"
                      onClick={() => handlePublish(blog._id)}
                    >
                      Publish
                    </button>
                  )}
                  {blog.status === "published" && (
                    <button
                      className="btn btn-sm bg-red-400 text-white"
                      onClick={() => handleUnpublish(blog._id)}
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    className="btn btn-sm bg-red-400 text-white"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;