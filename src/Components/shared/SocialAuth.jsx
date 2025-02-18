import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { toast } from "react-toastify";
import usePublic from "../../Hook/usePublic";

const SocialAuth = () => {
    const axiosPublic = usePublic();
    const { googleSign, isDarkMode } = useAuth();
    const navigate = useNavigate();

    const handleGoogle = () => {
        googleSign()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    photo: result.user.photoURL,
                    role: 'donor',
                    status: 'active'
                }
                console.log(userInfo)
                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                toast.success('Registration successfully')
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div className="flex justify-center items-center">
            <button onClick={handleGoogle} className={`${isDarkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-gray-800'} btn border border-red-400 rounded-full px-10 hover:bg-red-400 hover:text-white`}><FaGoogle></FaGoogle>Continue with Google</button>
        </div>
    );
};

export default SocialAuth;