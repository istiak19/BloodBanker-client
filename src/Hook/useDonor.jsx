// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useDonor = () => {
//     const { user } = useAuth()
//     const axiosSecure = useAxiosSecure()

//     const { data: donor, isPending: isAdminLoading } = useQuery({
//         queryKey: ['isAdmin', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/user/donor/${user?.email}`)
//             console.log(res?.data)
//             // return res.data.admin;
//         }
//     })
//     return [donor]
// };

// export default useDonor;