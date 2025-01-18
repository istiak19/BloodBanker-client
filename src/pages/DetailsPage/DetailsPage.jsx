import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const DetailsPage = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: donation } = useQuery({
        queryKey: ['detailsDonation', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donation/${id}`)
            return res.data;
        }
    })

    console.log(donation)
    return (
        <div>
            <h2>DetailsPage</h2>
        </div>
    );
};

export default DetailsPage;