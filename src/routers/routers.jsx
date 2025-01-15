import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login/Login";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    },
]);

export default routers;