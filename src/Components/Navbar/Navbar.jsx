import { Link, NavLink } from 'react-router-dom';
import logoPic from '../../assets/logo.png';
import useAuth from '../../Hook/useAuth';
import useRole from '../../Hook/useRole';
import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';

const Navbar = () => {
    const { user, signOutUser, isDarkMode, toggleTheme } = useAuth();
    const [role, isLoading] = useRole();
    const links = (
        <>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold  !bg-transparent" : "text-white")} to='/'>Home</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold !bg-transparent" : "text-white")} to='/search'>Search Donors</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold !bg-transparent" : "text-white")} to='/bloodDPublic'>Donation requests</NavLink></li>
            {
                user && <>
                    {
                        role === 'Admin' && <li><NavLink className={({ isActive }) => (isActive ? "!text-black !bg-transparent font-semibold" : "text-white")} to='/dashboard/AdminHome'>Dashboard</NavLink></li>
                    }
                    {
                        role === 'donor' && <li><NavLink className={({ isActive }) => (isActive ? "!text-black !bg-transparent font-semibold" : "text-white")} to='/dashboard/donorHome'>Dashboard</NavLink></li>
                    }
                    {
                        role === 'volunteer' && <li><NavLink className={({ isActive }) => (isActive ? "!text-black !bg-transparent font-semibold" : "text-white")} to='/dashboard/volunteerHome'>Dashboard</NavLink></li>
                    }
                </>
            }
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold !bg-transparent" : "text-white")} to='/blog'>Blog</NavLink></li>
            {
                user && <li><NavLink className={({ isActive }) => (isActive ? "!text-black !bg-transparent font-semibold" : "text-white")} to='/funding'>Funding</NavLink></li>
            }
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black font-semibold !bg-transparent" : "text-white")} to='/contact'>Contact</NavLink></li>
        </>
    );

    const handleLogOut = () => {
        signOutUser()
            .then(() => {

            })
            .catch(err => {
                // console.log(err)
            })
    }

    return (
        <div className="navbar bg-red-400 md:px-12 py-3 backdrop-blur-lg z-50 fixed w-full top-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow ${isDarkMode ? "bg-gray-800 text-white" : "bg-base-100 text-gray-900"}`}
                    >
                        {links}
                    </ul>
                </div>
                <Link to='/' className="text-xl">
                    <div className='flex items-center'>
                        <img className='w-8' src={logoPic} alt="Logo" />
                        <h3 className='text-xl ml-2 text-white'>BloodBanker</h3>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost text-gray-600 text-3xl ml-3"
                >
                    {isDarkMode ? <MdOutlineDarkMode /> : <MdLightMode />}
                </button>
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    title={user?.displayName}
                                    referrerPolicy='no-referrer'
                                    alt="Profile Avatar"
                                    src={user?.photoURL}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                        >
                            {
                                user && <>
                                    {
                                        role === 'Admin' && <li><Link to='/dashboard/AdminHome'>Dashboard</Link></li>
                                    }
                                    {
                                        role === 'donor' && <li><Link to='/dashboard/donorHome'>Dashboard</Link></li>
                                    }
                                    {
                                        role === 'volunteer' && <li><Link to='/dashboard/volunteerHome'>Dashboard</Link></li>
                                    }
                                </>
                            }
                            <li><button onClick={handleLogOut}>Logout</button></li>
                        </ul>
                    </div> : <Link to='/login' className="btn bg-transparent text-white">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;