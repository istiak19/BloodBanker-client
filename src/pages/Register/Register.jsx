import Lottie from "lottie-react";
import registerPic from '../../assets/lottie/design.json';
import { useForm } from "react-hook-form";
import usePublic from "../../Hook/usePublic";
import Swal from 'sweetalert2'
import useAuth from "../../Hook/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import SocialAuth from "../../Components/shared/SocialAuth";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { useState } from "react";

const image_key = import.meta.env.VITE_IMAGE;
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`

const Register = () => {
    const axiosPublic = usePublic()
    const { signup, updateProfileUser, isDarkMode } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [loading, setLoading] = useState(false);

    const { data: upazilas } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upazila')
            return res.data;
        }
    })
    const { data: districts } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/district')
            return res.data;
        }
    })

    // console.log(upazilas)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        // console.log(data)
        setLoading(true)
        const formData = new FormData();
        formData.append('image', data.photo[0]);
        const res = await axiosPublic.post(image_api, formData);
        const userInfo = {
            email: data.email,
            name: data.name,
            photo: res.data.data.url,
            upazila: data.upazila,
            district: data.district,
            bloodGroup: data.bloodGroup,
            role: 'donor',
            status: 'active'
        }
        signup(data.email, data.password)
            .then((result) => {
                // console.log(result.user)
                const update = {
                    displayName: data.name,
                    photoURL: res.data.data.url
                }
                updateProfileUser(update)
                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        // console.log(res.data)
                    })
                navigate(from, { replace: true });
                toast.success('Registration successfully')
                reset()
                setLoading(false)
            })
            .catch(err => {
                // console.log(err)
            })
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col py-10 md:flex-row justify-center items-center gap-10 min-h-screen p-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-red-50 text-black"}`}
        >
            {/* Form */}
            <div className="shadow-lg border border-dashed border-re rounded-xl p-8 w-full md:w-1/2 max-w-3xl">
                <Helmet>
                    <title>Register | Blood Donation</title>
                </Helmet>
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-red-500 text-transparent bg-clip-text">Create Your Account</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6"
                >
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-600" />
                            <input
                                id="name"
                                type="text"
                                {...register('name', { required: "Name is required" })}
                                placeholder="Your Name"
                                className={`pl-10 p-3 rounded-lg border w-full focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-900 placeholder:text-gray-50' : 'bg-red-50 border-black placeholder:text-gray-800'}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-600" />
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: "Email is required" })}
                                placeholder="Your Email"
                                className={`pl-10 p-3 rounded-lg w-full border focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-900 placeholder:text-gray-50' : 'bg-red-50 border-black placeholder:text-gray-800'}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-600" />
                            <input
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message: "Password must be at least 6 characters and include a letter, a number, and a special character"
                                    }
                                })}
                                placeholder="Password"
                                className={`pl-10 p-3 rounded-lg w-full border focus:outline-none focus:border-red-400 ${isDarkMode ? 'bg-gray-900 placeholder:text-gray-50' : 'bg-red-50 border-black placeholder:text-gray-800'}`}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label htmlFor="bloodGroup" className="sr-only">Blood Group</label>
                        <div className="relative">
                            <FaTint className="absolute left-3 top-3 text-gray-600" />
                            <select
                                id="bloodGroup"
                                {...register('bloodGroup', { required: "Blood group is required" })}
                                className={`pl-10 p-3 rounded-lg w-full cursor-pointer border focus:outline-none focus:border-red-400 ${isDarkMode ? 'bg-gray-900' : 'bg-red-50 border-black'}`}
                            >
                                <option value="">Select Blood Group</option>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                            {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup.message}</p>}
                        </div>
                    </div>

                    {/* District */}
                    <div>
                        <label htmlFor="district" className="sr-only">District</label>
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-600" />
                            <select
                                id="district"
                                {...register("district", { required: "District is required" })}
                                className={`pl-10 p-3 rounded-lg w-full cursor-pointer border focus:outline-none focus:border-red-400 ${isDarkMode ? 'bg-gray-900' : 'bg-red-50 border-black'}`}
                            >
                                <option value="">Select District</option>
                                {districts?.map((district, idx) => (
                                    <option key={idx} value={district.name}>{district.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Upazila */}
                    <div>
                        <label htmlFor="upazila" className="sr-only">Upazila</label>
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-600" />
                            <select
                                id="upazila"
                                {...register("upazila", { required: "Upazila is required" })}
                                className={`pl-10 p-3 rounded-lg w-full cursor-pointer border focus:outline-none focus:border-red-400 ${isDarkMode ? 'bg-gray-900' : 'bg-red-50 border-black'}`}
                            >
                                <option value="">Select Upazila</option>
                                {upazilas?.map((u, idx) => (
                                    <option key={idx} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* File Upload - Full width */}
                    <div className="col-span-1 md:col-span-2">
                        <label className={`flex items-center justify-center border border-dashed rounded-lg p-4 cursor-pointer transition ${isDarkMode ? 'hover:bg-none' : 'border-black hover:bg-none'}`}>
                            <input type="file" name="photo" {...register("photo")} id="photo" className="hidden"/>
                            <span className="text-red-700 font-semibold">Click to Upload Profile Photo</span>
                        </label>

                        {errors.photo && (
                            <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
                        )}
                    </div>

                    {/* Submit Button - Full width */}
                    <div className="col-span-1 md:col-span-2 text-center mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-pink-400 to-red-400 hover:from-red-500 hover:to-pink-600 text-white font-bold rounded-lg shadow-md transition-transform"
                        >
                            {loading ? <ClipLoader size={20} color="#fff" /> : "Register"}
                        </button>
                    </div>
                </form>
                <div className="my-3 flex items-center">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="mx-4 text-gray-400">OR</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                <SocialAuth />

                <p className="mt-3 text-center text-sm">
                    Already part of our mission?{" "}
                    <Link to="/login" className="text-red-400 font-medium hover:underline">
                        Log in and save lives
                    </Link>
                </p>
            </div>

            {/* Lottie Animation */}
            <div className="w-full md:w-1/3 max-w-sm">
                <Lottie animationData={registerPic} loop={true} />
            </div>
        </motion.div>
    );
};

export default Register;