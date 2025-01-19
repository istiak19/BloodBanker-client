import axios from 'axios';
const axiosPublic = axios.create({
    baseURL: "https://bloodbanker-server.vercel.app"
})
const usePublic = () => {
    return axiosPublic;
};

export default usePublic;