import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Fund = () => {
    const axiosSecure = useAxiosSecure();
    const { data: funds = [] } = useQuery({
        queryKey: ["funds"],
        queryFn: async () => {
            const res = await axiosSecure.get("/funds");
            return res.data;
        },
    });

    return (
        <div className="w-11/12 mx-auto mt-28">
            <Helmet>
                <title>Funding || BloodBanker</title>
            </Helmet>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Funds Management</h2>
                <Link to="/funding/add-fund" className="btn bg-red-400 text-white">
                    Give Fund
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fund Name</th>
                            <th>Fund Amount</th>
                            <th>Funding Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            funds.map((fund, idx) => (
                                <tr key={fund._id}>
                                    <td>{idx + 1}</td>
                                    <td>{fund.userName}</td>
                                    <td>${fund.amount}</td>
                                    <td>{new Date(fund.date).toLocaleDateString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Fund;