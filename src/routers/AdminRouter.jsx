import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useRole from '../Hook/useRole';
import Loading from '../Components/Loading/Loading';

const AdminRouter = ({ children }) => {
    const [role, isLoading] = useRole()
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading || isLoading) {
        return <Loading />
    }

    if (user || role === 'Admin') {
        return children
    }
    return (
        <div>
            <Navigate to='/login' state={{ from: location }} replace></Navigate>
        </div>
    );
};

export default AdminRouter;