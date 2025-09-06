import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import PrivateProvider from "./PrivateProvider";
import AdminRouter from "./AdminRouter";

const Contact = lazy(() => import("../pages/Contact/Contact"));
const AddFund = lazy(() => import("../pages/Fund/AddFund"));
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
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/bloodDPublic',
                element: <BloodDonationRequests />
            },
            {
                path: '/details/:id',
                element: <PrivateProvider><DetailsPage /></PrivateProvider>
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/blog/:id',
                element: <BlogDetails />
            },
            {
                path: '/funding',
                element: <PrivateProvider>
                    <Fund />
                </PrivateProvider>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/funding/add-fund',
                element: <PrivateProvider>
                    <AddFund />
                </PrivateProvider>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: '/dashboard',
                element: <PrivateProvider><Dashboard /></PrivateProvider>,
                children: [

                    // Donor router
                    {
                        path: 'donorHome',
                        element: <DonorHome />
                    },
                    {
                        path: 'profile',
                        element: <Profile />
                    },
                    {
                        path: 'edit-profile',
                        element: <UpdateProfile />
                    },
                    {
                        path: 'my-donation-requests',
                        element: <MyDonationRequests />
                    },
                    {
                        path: 'create-donation-request',
                        element: <CreateDonation />
                    },
                    {
                        path: 'donation/edit/:id',
                        element: <DonationRequestEdit />
                    },

                    // Admin router
                    {
                        path: 'profile',
                        element: <AdminRouter><Profile /></AdminRouter>
                    },
                    {
                        path: 'edit-profile',
                        element: <UpdateProfile />
                    },
                    {
                        path: 'AdminHome',
                        element: <AdminRouter><AdminHome /></AdminRouter>
                    },
                    {
                        path: 'all-users',
                        element: <AdminRouter><AllUserPage /></AdminRouter>
                    },
                    {
                        path: 'all-blood-donation-request',
                        element: <AdminRouter><AllBloodDonationRequest /></AdminRouter>
                    },
                    {
                        path: 'content-management',
                        element: <AdminRouter><ContentManagement /></AdminRouter>
                    },
                    {
                        path: 'content-management/add-blog',
                        element: <AdminRouter><AddBlog /></AdminRouter>
                    },

                    // volunteer router
                    {
                        path: 'volunteerHome',
                        element: <VolunteerHome />
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