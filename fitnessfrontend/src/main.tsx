import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegisterForm from "./components/auth/RegisterForm.tsx";
import VerificationPage from "./components/auth/VerificationPage.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";
import NavBar from "./components/HomePage/NavBar.tsx";
import Profile from "./components/Profile/Profile.tsx";
import CreateProfile from "./components/Profile/CreateProfile.tsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path:"/",
        element:<Navigate to={"/login"}/>,
        errorElement:<p>Page not found!</p>
    },
    {
        path:"/login",
        element:<LoginForm/>
    },
    {
        path:"/register",
        element:<RegisterForm />
    },
    {
        path:"/verificationPage",
        element:<VerificationPage />
    },
    {
        path: "/Fitness",
        element:<NavBar />,
        children:[
            {
                path:"/Fitness/home",
                element:<HomePage />
            },
            {
                path:"/Fitness/Profile",
                element:<Profile />,
            },
            {
                path:"/Fitness/CreateProfile",
                element:<CreateProfile/>
            }
        ]
    }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <App />
      </QueryClientProvider>
  </StrictMode>,
)
