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
                    {
                        path: 'profile',
                        element:<PrivateProvider><Profile></Profile></PrivateProvider>
                    }
                ]
            }
        ]
    },
]);

export default routers;