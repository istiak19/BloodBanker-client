import Lottie from 'lottie-react';
import loginPic from '../../assets/lottie/design.json';
import { useForm } from "react-hook-form";
import useAuth from '../../Hook/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SocialAuth from '../../Components/shared/SocialAuth';
import { motion } from 'framer-motion';

const Login = () => {
    const { signin, isDarkMode } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        signin(data.email, data.password)
            .then(() => {
                navigate('/');
                reset();
            })
            .catch(err => {
                // Handle error properly
                // console.error(err);
            });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-red-50 to-pink-100 text-black"}`}
        >
            <Helmet>
                <title>Login | BloodBanker</title>
            </Helmet>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 p-5 md:p-10">
                <div className="w-full md:w-1/2">
                    <Lottie animationData={loginPic} className="w-full max-w-md mx-auto" />
                </div>
                <div className={`w-full md:w-1/2 max-w-xl p-8 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-red-500 text-transparent bg-clip-text">
                        Welcome Back!
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                required
                                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:ring-pink-500' : 'bg-gray-100 border-gray-300 focus:ring-red-400'}`}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                {...register("password")}
                                required
                                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:ring-pink-500' : 'bg-gray-100 border-gray-300 focus:ring-red-400'}`}
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex justify-end text-sm">
                            <Link to="/forgot-password" className="text-red-400 hover:underline">Forgot password?</Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-pink-400 to-red-400 hover:from-red-400 hover:to-pink-500 text-white font-bold rounded-lg shadow-md transition-transform"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-3 flex items-center">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-4 text-gray-400">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <SocialAuth />

                    <p className="mt-3 text-center text-sm">
                        Don&apos;t have an account yet?{" "}
                        <Link to="/register" className="text-red-400 font-medium hover:underline">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;