import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: admin, isPending: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user?.email}`)
            console.log(res?.data.admin)
            return res.data.admin;
        }
    })
    return [admin]
};

export default useAdmin;