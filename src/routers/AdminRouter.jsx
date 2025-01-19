import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useRole from '../Hook/useRole';

const AdminRouter = ({ children }) => {
    const [role, isLoading] = useRole()
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading || isLoading) {
        return <span className="loading loading-bars loading-lg"></span>
    }

    if (user || role==='Admin') {
        return children
    }
    return (
        <div>
            <Navigate to='/login' state={{ from: location }} replace></Navigate>
        </div>
    );
};

export default AdminRouter;