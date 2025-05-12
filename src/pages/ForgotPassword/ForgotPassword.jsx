import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import { motion } from "framer-motion";

const ForgotPassword = () => {
    const { resetPassword, isDarkMode } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await resetPassword(data.email);
            Swal.fire({
                icon: "success",
                title: "Check your email!",
                text: "We have sent you a link to reset your password.",
            });
            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex justify-center items-center transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-pink-300 to-red-300'}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`w-full max-w-md p-8 rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800 *:text-gray-100' : 'bg-white'}`}
            >
                <h2 className={`text-3xl font-semibold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Forgot Password?
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email Address</label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Enter your email"
                                className="w-full p-4 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out"
                            />
                            <i className="absolute left-3 top-3 text-gray-500">📧</i>
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 text-center"
                    >
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-pink-400 to-red-400 hover:from-red-400 hover:to-pink-500 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 ease-in-out"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </motion.div>
                </form>
                <div className="text-center mt-6">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Remember your password?
                        <span
                            className="text-red-400 cursor-pointer hover:underline ml-1"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;