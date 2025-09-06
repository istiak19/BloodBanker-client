import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import PrivateProvider from "./PrivateProvider";
import AdminRouter from "./AdminRouter";
import { lazy } from "react";

const Contact = lazy(() => import("../pages/Contact/Contact"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const UpdateProfile = lazy(() => import("../pages/UpdateProfile/UpdateProfile"));
const Fund = lazy(() => import("../pages/Fund/Fund"));
const BlogDetails = lazy(() => import("../pages/Blog/BlogDetails"));
const Blog = lazy(() => import("../pages/Blog/Blog"));
const AddBlog = lazy(() => import("../pages/Dashboard/Admin/AddBlog/AddBlog"));
const VolunteerHome = lazy(() => import("../pages/Dashboard/Volunteer/VolunteerHome/VolunteerHome"));
const DetailsPage = lazy(() => import("../pages/DetailsPage/DetailsPage"));
const BloodDonationRequests = lazy(() => import("../pages/BloodDonationRequests/BloodDonationRequests"));
const DonationRequestEdit = lazy(() => import("../pages/Dashboard/Donor/DonationRequestEdit/DonationRequestEdit"));
const DonorHome = lazy(() => import("../pages/Dashboard/Donor/DonorHome/DonorHome"));
const MyDonationRequests = lazy(() => import("../pages/Dashboard/Donor/MyDonationRequests/MyDonationRequests"));
const CreateDonation = lazy(() => import("../pages/Dashboard/Donor/CreateDonation/CreateDonation"));
const ContentManagement = lazy(() => import("../pages/Dashboard/Admin/ContentManagement/ContentManagement"));
const AllBloodDonationRequest = lazy(() => import("../pages/Dashboard/Admin/AllBloodDonationRequest/AllBloodDonationRequest"));
const AllUserPage = lazy(() => import("../pages/Dashboard/Admin/AllUsersPage/AllUsersPage"));
const AdminHome = lazy(() => import("../pages/Dashboard/Admin/AdminHome/AdminHome"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));
const Search = lazy(() => import("../pages/Search/Search"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));

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
                path: '/bloodDPublic',
                element: <BloodDonationRequests></BloodDonationRequests>
            },
            {
                path: '/details/:id',
                element: <PrivateProvider><DetailsPage></DetailsPage></PrivateProvider>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/blog/:id',
                element: <BlogDetails></BlogDetails>
            },
            {
                path: '/funding',
                element: <PrivateProvider><Fund></Fund></PrivateProvider>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/funding/add-fund',
                element: <PrivateProvider><AddFund></AddFund></PrivateProvider>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword></ForgotPassword>
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
                        path: 'edit-profile',
                        element: <UpdateProfile></UpdateProfile>
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
                        path: 'edit-profile',
                        element: <UpdateProfile></UpdateProfile>
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
                    },
                    {
                        path: 'content-management/add-blog',
                        element: <AdminRouter><AddBlog></AddBlog></AdminRouter>
                    },
                    
                    // volunteer router
                    {
                        path: 'volunteerHome',
                        element: <VolunteerHome></VolunteerHome>
                    },
                    // {
                    //     path: 'all-blood-donation-request',
                    //     element: <AllBloodDonationV></AllBloodDonationV>
                    // }
                ]
            }
        ]
    },
]);

export default routers;