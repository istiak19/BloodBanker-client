import { lazy, Suspense } from "react";
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
const ManageUsers = lazy(() => import("../pages/Dashboard/Admin/Manage Users/Manage Users"));
const AdminHome = lazy(() => import("../pages/Dashboard/Admin/AdminHome/AdminHome"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));
const Search = lazy(() => import("../pages/Search/Search"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));

const Loadable = (Component) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component />
    </Suspense>
);

const routers = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: Loadable(ErrorPage),
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/search",
                element: Loadable(Search)
            },
            {
                path: "/bloodDPublic",
                element: Loadable(BloodDonationRequests)
            },
            {
                path: "/details/:id",
                element: (
                    <PrivateProvider>{Loadable(DetailsPage)}</PrivateProvider>
                )
            },
            {
                path: "/blog",
                element: Loadable(Blog)
            },
            {
                path: "/blog/:id",
                element: Loadable(BlogDetails)
            },
            {
                path: "/funding",
                element: (
                    <PrivateProvider>{Loadable(Fund)}</PrivateProvider>
                )
            },
            {
                path: "/contact",
                element: Loadable(Contact)
            },
            {
                path: "/funding/add-fund",
                element: (
                    <PrivateProvider>{Loadable(AddFund)}</PrivateProvider>
                )
            },
            {
                path: "/login",
                element: Loadable(Login)
            },
            {
                path: "/forgot-password",
                element: Loadable(ForgotPassword)
            },
            {
                path: "/register",
                element: Loadable(Register)
            },
            {
                path: "/dashboard",
                element: (
                    <PrivateProvider>{Loadable(Dashboard)}</PrivateProvider>
                ),
                children: [
                    {
                        path: "donorHome",
                        element: Loadable(DonorHome)
                    },
                    {
                        path: "profile",
                        element: Loadable(Profile)
                    },
                    {
                        path: "edit-profile",
                        element: Loadable(UpdateProfile)
                    },
                    {
                        path: "my-donation-requests",
                        element: Loadable(MyDonationRequests)
                    },
                    {
                        path: "create-donation-request",
                        element: Loadable(CreateDonation)
                    },
                    {
                        path: "donation/edit/:id",
                        element: Loadable(DonationRequestEdit)
                    },
                    
                    // Admin routes
                    {
                        path: "profile",
                        element: <AdminRouter>{Loadable(Profile)}</AdminRouter>
                    },
                    {
                        path: "admin-dashboard",
                        element: <AdminRouter>{Loadable(AdminHome)}</AdminRouter>
                    },
                    {
                        path: "all-users",
                        element: <AdminRouter>{Loadable(ManageUsers)}</AdminRouter>
                    },
                    {
                        path: "all-blood-donation-request",
                        element: <AdminRouter>{Loadable(AllBloodDonationRequest)}</AdminRouter>
                    },
                    {
                        path: "content-management",
                        element: <AdminRouter>{Loadable(ContentManagement)}</AdminRouter>
                    },
                    {
                        path: "content-management/add-blog",
                        element: <AdminRouter>{Loadable(AddBlog)}</AdminRouter>
                    },
                    // Volunteer
                    {
                        path: "volunteerHome",
                        element: Loadable(VolunteerHome)
                    }
                ]
            }
        ]
    }
]);

export default routers;