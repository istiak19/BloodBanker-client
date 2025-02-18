import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckForm from "./CheckForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const AddFund = () => {
    const [amount, setAmount] = useState(null);

    return (
        <div className="max-w-2xl border mx-auto bg-red-100 mt-28 text-center pt-4 rounded-lg">
            <Helmet>
                <title>AddFund | BloodBanker</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4 text-center">Give Your Fund</h2>
            <div className="card shadow-lg p-6 rounded-md">
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
                            className="input input-bordered w-full max-w-sm"
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