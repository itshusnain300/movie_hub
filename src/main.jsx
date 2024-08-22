import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./route.jsx";
import "./index.css";
import { MovieContextProvider } from "./MoviesContext.jsx";
import { AuthProvider } from "./AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MovieContextProvider>
        <RouterProvider router={router} />
      </MovieContextProvider>
    </AuthProvider>
  </StrictMode>
);
