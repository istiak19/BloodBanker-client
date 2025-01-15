import Lottie from "lottie-react";
import registerPic from '../../assets/lottie/design.json';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePublic from "../../Hook/usePublic";
import Swal from 'sweetalert2'
import useAuth from "../../Hook/useAuth";
import { Link } from "react-router-dom";

const image_key = import.meta.env.VITE_IMAGE;
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`

const Register = () => {
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const axiosPublic = usePublic()
    const { signup, updateProfileUser } = useAuth()

    // Fetch Upazila Data
    useEffect(() => {
        const fetchUpazilas = async () => {
            try {
                const res = await fetch('./upazila.json');
                const data = await res.json();
                setUpazilas(data);
            } catch (error) {
                console.error("Error fetching upazilas:", error);
            }
        };
        fetchUpazilas();
    }, []);

    // Fetch District Data
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const res = await fetch('./dist.json');
                const data = await res.json();
                setDistricts(data);
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        };
        fetchDistricts();
    }, []);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        // console.log(data)
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
        if (data.password !== data.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passwords do not match!",
            });
            return;
        }
        console.log(userInfo)
        signup(data.email, data.password)
            .then((result) => {
                console.log(result.user)
                const update = {
                    displayName: data.name,
                    photoURL: res.data.data.url
                }
                updateProfileUser(update)
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div>
            <section>
                <div className="container lg:flex items-center justify-center gap-10 min-h-screen px-6 mx-auto">
                    <div>
                        <Lottie animationData={registerPic}></Lottie>
                    </div>
                    <form className="w-full lg:max-w-lg" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                        {/* Username Field */}
                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </span>
                            <input
                                type="text"
                                name="name"
                                {...register("name")}
                                required
                                className="block w-full py-3 text-gray-700 border rounded-lg px-11 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring-opacity-40"
                                placeholder="Username"
                            />
                        </div>

                        {/* Photo Upload */}
                        <label htmlFor="photo" className="flex items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <input type="file" name="photo" {...register("photo")} id="photo" />
                        </label>

                        {/* Blood Group Selector */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Blood Group
                            </label>
                            <select
                                name="bloodGroup"
                                {...register("bloodGroup")}
                                required
                                className="block w-full py-3 text-gray-700 border rounded-lg px-4 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring-opacity-40"
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {/* District Selector */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                District
                            </label>
                            <select
                                name="district"
                                {...register("district")}
                                required
                                className="block w-full py-3 text-gray-700 border rounded-lg px-4 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring-opacity-40"
                            >
                                <option value="">Select District</option>
                                {
                                    districts.map((district, idx) => <option key={idx} value={district.name}>{district.name}</option>)
                                }
                            </select>
                        </div>

                        {/* Upazila Selector */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Upazila
                            </label>
                            <select
                                name="upazila"
                                {...register("upazila")}
                                required
                                className="block w-full py-3 text-gray-700 border rounded-lg px-4 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring-opacity-40"
                            >
                                <option value="">Select Upazila</option>
                                {
                                    upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)
                                }
                            </select>
                        </div>

                        {/* Email Field */}
                        <div className="relative flex items-center mt-6">
                            <span className="absolute">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mx-3 text-gray-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                name="email"
                                {...register("email")}
                                required
                                className="block w-full py-3 text-gray-700 border rounded-lg px-11 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring-opacity-40"
                                placeholder="Email Address"
                            />
                        </div>

                        {/* Password and Confirm Password Fields */}
                        <div className="relative flex items-center mt-4">
                            <input
                                type="password"
                                name="password"
                                {...register("password")}
                                required
                                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring-opacity-40"
                                placeholder="Password"
                            />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <input
                                type="password"
                                name="confirmPassword"
                                {...register("confirmPassword")}
                                required
                                className="block w-full px-10 py-3 text-black bg-white border rounded-lg focus:border-black focus:ring-red-300 focus:outline-none focus:ring-opacity-40"
                                placeholder="Confirm Password"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring focus:ring-red-400 focus:ring-opacity-50"
                            >
                                Sign Up
                            </button>
                            <div className="mt-6">
                                <Link to='/login' className="text-sm text-red-500 hover:underline">
                                    Already have an account?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Register;