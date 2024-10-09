
import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import Register from "../views/RegisterPage";
import Home from "../views/Home";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: "/",
        element: <Home />,
    },
]);

export default router
