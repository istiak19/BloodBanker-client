import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDonor = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: donor, isLoading: isDonorLoading } = useQuery({
        queryKey: ['isDonor', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/donor/${user?.email}`)
            console.log(res?.data)
            return res.data.donor;
        }
    })
    return [donor]
};

export default useDonor;