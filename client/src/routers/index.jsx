
import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import Register from "../views/RegisterPage";
import Home from "../views/Home";
const Url = "http://localhost:3000"
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage Url={Url} />
    },
    {
        path: '/register',
        element: <Register Url={Url} />
    },
    {
        path: "/",
        element: <Home />,
    },
]);

export default router
