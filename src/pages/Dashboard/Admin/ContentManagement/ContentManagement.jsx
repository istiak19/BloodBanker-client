import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ContentManagement = () => {
  return (
    <div>
      <Helmet>
        <title>ContentManagement || BloodBanker</title>
      </Helmet>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Content Management</h3>
        <Link to='/dashboard/content-management/add-blog'
          className="btn bg-red-400 text-white"
        >
          Add Blog
        </Link>
      </div>
    </div>
  );
};

export default ContentManagement;