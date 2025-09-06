import { Link, NavLink } from 'react-router-dom';
import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import logoPic from '../../assets/logo.png';
import useAuth from '../../Hook/useAuth';
import useRole from '../../Hook/useRole';

const Navbar = () => {
    const { user, signOutUser, isDarkMode, toggleTheme } = useAuth();
    const [role] = useRole();

    const links = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "!text-black font-semibold !bg-transparent" : "text-white hover:text-black hover:!bg-transparent transition"}>Home</NavLink></li>
            <li><NavLink to="/search" className={({ isActive }) => isActive ? "!text-black font-semibold !bg-transparent" : "text-white hover:text-black hover:!bg-transparent transition"}>Search Donors</NavLink></li>
            <li><NavLink to="/bloodDPublic" className={({ isActive }) => isActive ? "!text-black font-semibold !bg-transparent" : "text-white hover:text-black hover:!bg-transparent transition"}>Donation Requests</NavLink></li>

            {user && role && (
                <li><NavLink to={`/dashboard/${role.toLowerCase()}Home`} className={({ isActive }) => isActive ? "!text-black font-semibold !bg-transparent" : "text-white hover:text-black hover:!bg-transparent transition"}>Dashboard</NavLink></li>
            )}
            {user && (
                <li><NavLink to="/funding" className={({ isActive }) => isActive ? "!text-black font-semibold !bg-transparent" : "text-white hover:text-black hover:!bg-transparent transition"}>Donate Funds</NavLink></li>
            )}

            <li><NavLink to="/blog" className={({ isActive }) => isActive ? "!text-black font-semibold !bg-transparent" : "text-white hover:text-black hover:!bg-transparent transition"}>Blog</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "!text-black font-semibold !bg-transparent" : "text-white hover:text-black hover:!bg-transparent transition"}>Contact</NavLink></li>
        </>
    );

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                toast.success('Successfully logged out!');
            })
            .catch(() => {
                toast.error('Failed to logout. Please try again.');
            });
    };

    return (
        <div className="navbar bg-red-400 backdrop-blur-md px-4 container mx-auto py-2 fixed top-0 left-0 right-0 z-50">
            <ToastContainer />

            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 p-3 shadow rounded-box w-52 ${isDarkMode ? "bg-gray-600 text-white" : "bg-gray-600 text-gray-900"}`}>
                        {links}
                    </ul>
                </div>

                <Link to="/" className="flex items-center gap-2">
                    <img src={logoPic} alt="BloodBanker Logo" className="w-9 h-9 bg-white p-1 rounded-full" />
                    <span className="text-xl font-bold text-black">
                        Blood<span className="text-white">Banker</span>
                    </span>
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-3 flex-wrap">
                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="text-2xl text-white hover:text-black">
                    {isDarkMode ? <MdOutlineDarkMode /> : <MdLightMode />}
                </button>

                {/* Profile and Login/Logout */}
                {user ? (
                    <div className="flex justify-center items-center gap-3">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full border-2 border-white shadow-2xl">
                                    <img src={user?.photoURL || '/default-avatar.png'} alt="User Avatar" referrerPolicy="no-referrer" className="object-cover" />
                                </div>
                            </label>
                            <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                                <li>
                                    <Link to={`/dashboard/${role?.toLowerCase()}Home`}>Dashboard</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogOut}>Logout</button>
                                </li>
                            </ul>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogOut}
                            className="hidden sm:flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-400 text-white font-semibold shadow-md hover:from-red-400 hover:to-pink-500 transition-all duration-300 border-white border"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h12m0 0l-3.5-3.5M21 12l-3.5 3.5M12 4v1m0 14v1m8-8h1M3 12H2" />
                            </svg>
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-400 text-white font-semibold shadow-md hover:from-red-400 hover:to-pink-500 transition-all duration-300 border-white border"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H3m0 0l3.5-3.5M3 12l3.5 3.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;