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
        <div className={`min-h-screen flex items-center justify-center py-10 px-4 
            ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-r from-pink-100 to-red-200 text-gray-800'}`}>
            <Helmet>
                <title>Add Fund | BloodBanker</title>
            </Helmet>

            <div className={`w-full max-w-2xl p-8 rounded-2xl shadow-2xl 
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>

                <h2 className="text-3xl font-bold text-center mb-8">Support Our Mission</h2>

                {/* Amount Input */}
                <div className="mb-6">
                    <label htmlFor="amount" className="block text-lg font-semibold mb-2">
                        Enter Fund Amount (USD):
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 50"
                        className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 
                            ${isDarkMode
                                ? 'bg-gray-700 border-gray-600 focus:ring-pink-500 text-gray-200'
                                : 'bg-gray-100 border-gray-300 focus:ring-red-400 text-gray-900'
                            }`}
                    />
                </div>

                {/* Stripe Payment Form */}
                <div className="pt-4">
                    <Elements stripe={stripePromise}>
                        <CheckForm amount={amount} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default AddFund;