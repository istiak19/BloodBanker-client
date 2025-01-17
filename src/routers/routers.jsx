import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateProvider from "./PrivateProvider";
import Profile from "../pages/Profile/Profile";
import AdminRouter from "./AdminRouter";
import AdminHome from '../pages/Dashboard/Admin/AdminHome/AdminHome';
import AllUserPage from '../pages/Dashboard/Admin/AllUsersPage/AllUsersPage';
import AllBloodDonationRequest from '../pages/Dashboard/Admin/AllBloodDonationRequest/AllBloodDonationRequest';
import ContentManagement from '../pages/Dashboard/Admin/ContentManagement/ContentManagement';
import CreateDonation from '../pages/Dashboard/Donor/CreateDonation/CreateDonation';
import MyDonationRequests from '../pages/Dashboard/Donor/MyDonationRequests/MyDonationRequests';
import DonorHome from '../pages/Dashboard/Donor/DonorHome/DonorHome';
import  DonationRequestEdit from '../pages/Dashboard/Donor/DonationRequestEdit/DonationRequestEdit';

const routers = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/search',
                element: <Search></Search>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: '/dashboard',
                element: <PrivateProvider><Dashboard></Dashboard></PrivateProvider>,
                children: [
                    // Donor router
                    {
                        path: 'donorHome',
                        element: <DonorHome></DonorHome>
                    },
                    {
                        path: 'profile',
                        element: <Profile></Profile>
                    },
                    {
                        path: 'my-donation-requests',
                        element: <MyDonationRequests></MyDonationRequests>
                    },
                    {
                        path: 'create-donation-request',
                        element: <CreateDonation></CreateDonation>
                    },
                    {
                        path: 'donation/edit/:id',
                        element: <DonationRequestEdit></DonationRequestEdit>
                    },

                    // Admin router
                    {
                        path: 'profile',
                        element: <AdminRouter><Profile></Profile></AdminRouter>
                    },
                    {
                        path: 'AdminHome',
                        element: <AdminRouter><AdminHome></AdminHome></AdminRouter>
                    },
                    {
                        path: 'all-users',
                        element: <AdminRouter><AllUserPage></AllUserPage></AdminRouter>
                    },
                    {
                        path: 'all-blood-donation-request',
                        element: <AdminRouter><AllBloodDonationRequest></AllBloodDonationRequest></AdminRouter>
                    },
                    {
                        path: 'content-management',
                        element: <AdminRouter><ContentManagement></ContentManagement></AdminRouter>
                    }
                ]
            }
        ]
    },
]);

export default routers;