import { Link, NavLink } from 'react-router-dom';
import logoPic from '../../assets/logo.png';
import useAuth from '../../Hook/useAuth';
import useAdmin from '../../Hook/useAdmin';
import useVolunteer from '../../Hook/useVolunteer';

const Navbar = () => {
    const { user, signOutUser } = useAuth()
    const [isAdmin] = useAdmin();
    const [isVolunteer] = useVolunteer()
    const links = (
        <>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black  !bg-transparent" : "text-white")} to='/'>Home</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black !bg-transparent" : "text-white")} to='/bloodDPublic'>Donation requests</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? "!text-black !bg-transparent" : "text-white")} to='/blog'>Blog</NavLink></li>
            {
                user && <li><NavLink className={({ isActive }) => (isActive ? "!text-black !bg-transparent" : "text-white")} to='/funding'>Funding</NavLink></li>
            }
        </>
    );

    const handleLogOut = () => {
        signOutUser()
            .then(() => {

            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="navbar bg-red-400 md:px-16 py-3 backdrop-blur-lg z-50 fixed w-full top-0">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    referrerPolicy='no-referrer'
                                    alt="Profile Avatar"
                                    src={user?.photoURL}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {
                                user && isAdmin && <li><Link to='/dashboard/AdminHome'>Dashboard</Link></li>
                            }
                            {
                                user && !isAdmin && <li><Link to='/dashboard/donorHome'>Dashboard</Link></li>
                            }
                            {
                                user && !isAdmin && isVolunteer && <li><Link to='/dashboard/volunteerHome'>Dashboard</Link></li>
                            }
                            <li><button onClick={handleLogOut}>Logout</button></li>
                        </ul>
                    </div> : <Link to='/login' className="btn bg-transparent">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;