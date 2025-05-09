import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";

const CheckForm = ({ amount }) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [transaction, setTransaction] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (amount > 0) {
            axiosSecure
                .post("/create-payment", { price: amount })
                .then((res) => {
                    if (res.data?.clientSecret) {
                        setClientSecret(res.data.clientSecret);
                    } else {
                        console.error("Failed to get clientSecret");
                    }
                })
                .catch((err) => console.error("Error fetching clientSecret:", err));
        }
    }, [amount, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError("Stripe is not loaded yet. Please try again.");
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card details are not entered.");
            return;
        }

        setError("");

        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (paymentError) {
            setError(paymentError.message);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || "N/A",
                    name: user?.displayName || "N/A",
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            setTransaction(paymentIntent.id);
            const paymentData = {
                name: user?.displayName,
                email: user?.email,
                date: new Date(),
                amount,
            };

            axiosSecure.post("/payments", paymentData)
                .then((res) => {
                    if (res.data?.insertedId) {
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Payment successful!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        navigate("/funding");
                    }
                })
                .catch((err) => console.error("Error saving payment:", err));
        } else {
            setError("Payment failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 border-dashed border border-red-400">
            <h3 className="text-xl font-semibold text-center">Complete Your Donation</h3>

            {/* Card Input */}
            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
            </div>

            {/* Pay Button */}
            <button
                type="submit"
                className="w-full px-6 py-3 rounded-md bg-gradient-to-r from-pink-500 to-red-400 text-white font-semibold shadow-md hover:from-red-400 hover:to-pink-500 transition-all duration-300 border-white border"
                disabled={!stripe || !clientSecret}
            >
                Pay ${amount}
            </button>

            {/* Error and Transaction ID */}
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            {transaction && (
                <p className="text-green-500 mt-2 text-center">Transaction ID: {transaction}</p>
            )}
        </form>
    );
};

export default CheckForm;