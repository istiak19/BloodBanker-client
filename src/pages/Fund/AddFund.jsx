import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckForm from "./CheckForm";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hook/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const AddFund = () => {
    const [amount, setAmount] = useState(null);
    const { isDarkMode } = useAuth();

    return (
        <div className={`px-80 border py-10 text-center rounded-lg 
            ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-red-50 text-gray-800'}`}>
            <Helmet>
                <title>AddFund | BloodBanker</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Give Your Fund</h2>
            <div className={`card shadow-lg p-6 rounded-md 
                ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-red-100 text-gray-800'}`}>
                <form>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-lg font-semibold mb-2">
                            Enter Fund Amount:
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount in USD"
                            className={`input input-bordered w-full max-w-sm 
                                ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-900'}`}
                        />
                    </div>
                </form>
                <Elements stripe={stripePromise}>
                    <CheckForm amount={amount}></CheckForm>
                </Elements>
            </div>
        </div>
    );
};

export default AddFund;