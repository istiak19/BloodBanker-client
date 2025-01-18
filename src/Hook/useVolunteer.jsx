import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useVolunteer = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: volunteer, isLoading: isVolunteerLoading } = useQuery({
        queryKey: ['isVolunteer', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/volunteer/${user?.email}`)
            // console.log(res?.data.volunteer)
            return res.data.volunteer;
        }
    })
    return [volunteer]
};

export default useVolunteer;