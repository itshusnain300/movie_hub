import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import MovieList from "./components/MovieList";
import CreateMovie from "./components/CreateMovie";
import UpdateMovie from "./components/UpdateMovie";
import { AuthLayout, AppLayout } from "./layouts/Layout";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Check if the user is authenticated
const checkAuth = () => {
  return localStorage.getItem("token") ? "/movies" : "/auth/signin";
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={checkAuth()} />,
  },
  {
    path: "/movies",
    element: localStorage.getItem("token") ? <AppLayout /> : <Navigate to="/auth/signin" />,
    children: [
      {
        path: "",
        element: <MovieList />,
      },
      {
        path: "create",  
        element: <CreateMovie />,
      },
      {
        path: "update/:id",  
        element: <UpdateMovie />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",  
        element: <Signin />,
      },
      {
        path: "signup",  
        element: <Signup />,
      },
    ],
  },
]);
