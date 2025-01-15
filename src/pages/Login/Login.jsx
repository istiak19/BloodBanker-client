import Lottie from 'lottie-react';
import loginPic from '../../assets/lottie/design.json'
import { useForm } from "react-hook-form";
import useAuth from '../../Hook/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { signin } = useAuth();
    const navigate = useNavigate();


    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        console.log(data)
        signin(data.email, data.password)
            .then((result) => {
                console.log(result.user)
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left ml-10">
                    <Lottie className='w-[500px]' animationData={loginPic}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold pt-3 text-center">Login now!</h1>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email'
                                {...register("email")} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"
                                name='password'
                                {...register("password")}
                                placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-red-400 hover:bg-red-500 text-white">Login</button>
                        </div>
                    </form>
                    <p className='px-8 pb-4'>New here? <span className='text-red-400 border-b'><Link to='/register'>Create a New Account</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;