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
            {[
                { path: '/', label: 'Home' },
                { path: '/search', label: 'Search Donors' },
                { path: '/bloodDPublic', label: 'Donation Requests' },
                { path: '/blog', label: 'Blog' },
                { path: '/contact', label: 'Contact' },
            ].map(({ path, label }) => (
                <li key={path}>
                    <NavLink
                        to={path}
                        className={({ isActive }) =>
                            isActive
                                ? "!text-black font-semibold !bg-transparent"
                                : "text-white hover:text-black hover:!bg-transparent transition"
                        }
                    >
                        {label}
                    </NavLink>
                </li>
            ))}
            {user && (
                <li>
                    <NavLink
                        to="/funding"
                        className={({ isActive }) =>
                            isActive
                                ? "!text-black font-semibold !bg-transparent"
                                : "text-white hover:text-black hover:!bg-transparent transition"
                        }
                    >
                        Funding
                    </NavLink>
                </li>
            )}
            {user && role && (
                <li>
                    <NavLink
                        to={`/dashboard/${role.toLowerCase()}Home`}
                        className={({ isActive }) =>
                            isActive
                                ? "!text-black font-semibold !bg-transparent"
                                : "text-white hover:text-black hover:!bg-transparent transition"
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                toast.success('Successfully logged out!');
            })
            .catch(err => {
                // console.error('Logout Error:', err);
                toast.error('Failed to logout. Please try again.');
            });
    };

    return (
        <div className="navbar bg-red-400 backdrop-blur-md px-4 md:px-12 py-2 fixed top-0 left-0 right-0 z-50">
            <ToastContainer />
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content mt-3 p-3 shadow rounded-box w-52 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                            }`}
                    >
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
                <button onClick={toggleTheme} className="btn btn-ghost text-2xl text-white hover:text-black">
                    {isDarkMode ? <MdOutlineDarkMode /> : <MdLightMode />}
                </button>

                {/* Profile & Login */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={user?.photoURL || '/default-avatar.png'} // <-- Local default avatar recommended
                                    alt="User Avatar"
                                    referrerPolicy="no-referrer"
                                    className="object-cover"
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                                }`}
                        >
                            <li>
                                <Link to={`/dashboard/${role?.toLowerCase()}Home`}>Dashboard</Link>
                            </li>
                            <li>
                                <button onClick={handleLogOut}>Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="btn border-white bg-transparent text-white hover:bg-white/60 hover:text-red-400 transition"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;