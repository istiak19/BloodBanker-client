import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})
const useAxiosSecure = () => {
    const { signOutUser } = useAuth()
    const navigate = useNavigate()

    const token = localStorage.getItem('access-token');
    axiosSecure.interceptors.request.use(function (config) {
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        // console.log('interceptors', token)
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axiosSecure.interceptors.response.use(response => {
        return response;
    }, async (error) => {
        const status = error?.response?.status;
        if (error.status === 401 || error === 403) {
            await signOutUser()
            navigate('/login')
        }
        // console.log('caught in interceptors--->', error)
        return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxiosSecure;