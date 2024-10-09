import { createBrowserRouter, redirect } from "react-router-dom";
import { io } from "socket.io-client";
import LoginPage from "../views/LoginPage";
import Register from "../views/RegisterPage";
import Home from "../views/Home";

const socket = io("http://localhost:3000", {
    autoConnect: false
})

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage socket={socket}/>,
    },
    {
        path: '/register',
        element: <Register socket={socket}/>
    },
    {
    path: "/",
    element: <Home socket={socket}/>,

    },
]);

export default router
