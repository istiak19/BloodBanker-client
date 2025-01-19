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
                amount
            };

            axiosSecure.post("/payments", paymentData)
                .then((res) => {
                    if (res.data?.insertedId) {
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Payment successful!",
                            showConfirmButton: false,
                            timer: 1500
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
        <form onSubmit={handleSubmit} className="mt-4">
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
            <button
                type="submit"
                className="btn bg-red-400 mt-4"
                disabled={!stripe || !clientSecret}
            >
                Pay ${amount}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {transaction && (
                <p className="text-green-500 mt-2">Transaction ID: {transaction}</p>
            )}
        </form>
    );
};

export default CheckForm;