import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useAdmin from '../Hook/useAdmin';

const AdminRouter = ({ children }) => {
    const [admin, isAdminLoading] = useAdmin();
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }

    if (user || admin) {
        return children
    }
    return (
        <div>
            <Navigate to='/login' state={{ from: location }} replace></Navigate>
        </div>
    );
};

export default AdminRouter;