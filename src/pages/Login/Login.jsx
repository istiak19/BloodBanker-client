import Lottie from 'lottie-react';
import loginPic from '../../assets/lottie/design.json';
import { useForm } from "react-hook-form";
import useAuth from '../../Hook/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SocialAuth from '../../Components/shared/SocialAuth';

const Login = () => {
    const { signin, isDarkMode } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        signin(data.email, data.password)
            .then((result) => {
                navigate('/');
                reset();
            })
            .catch(err => {
                // Handle error
            });
    };

    return (
        <div className={`hero min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-red-50 text-black"}`}>
            <Helmet>
                <title>Login | BloodBanker</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left ml-10">
                    <Lottie className='w-[500px]' animationData={loginPic}></Lottie>
                </div>
                <div className={`card ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-red-50 text-black'} w-full max-w-lg shrink-0 shadow-2xl`}>
                    <h1 className="text-5xl font-bold pt-3 text-center">Login now!</h1>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email'
                                {...register("email")} className={`input input-bordered ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300 bg-red-50'}`} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"
                                name='password'
                                {...register("password")}
                                placeholder="password" className={`input input-bordered ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300 bg-red-50'}`} required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className={`btn ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-400 hover:bg-red-500'} text-white`}>Login</button>
                        </div>
                    </form>
                    <div className="divider text-red-500 px-8">OR</div>
                    <SocialAuth />
                    <p className='px-8 pt-4 pb-4'>New here? <span className='text-red-400 hover:underline'><Link to='/register'>Create a New Account</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;