import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Loading from "../Components/Loading/Loading";

const PrivateProvider = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading />
    };


    if (user) {
        return children;
    };

    return <Navigate to='/login' state={{ from: location }} replace />
};

export default PrivateProvider;