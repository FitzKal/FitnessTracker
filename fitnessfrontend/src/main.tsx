import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginForm from "./components/auth/LoginForm.tsx";
import RegisterForm from "./components/auth/RegisterForm.tsx";
import VerificationPage from "./components/auth/VerificationPage.tsx";
import HomePage from "./components/homePage/HomePage.tsx";
import NavBar from "./components/homePage/NavBar.tsx";
import Profile from "./components/profile/Profile.tsx";
import CreateProfile from "./components/profile/CreateProfile.tsx";
import BMICalculator from "./components/calculators/bmi/BMICalculator.tsx";
import CalculatorNavBar from "./components/calculators/CalculatorNavBar.tsx";
import ProteinCalculator from "./components/calculators/protein/ProteinCalculator.tsx";
import CalorieCalculator from "./components/calculators/calories/CalorieCalculator.tsx";
import DisplayWorkouts from "./components/workouts/DisplayWorkouts.tsx";
import WorkoutPage from "./components/workouts/WorkoutPage.tsx";
import DisplayGoals from "./components/goals/DisplayGoals.tsx";
import GoalNavBar from "./components/goals/GoalNavBar.tsx";
import ExtendedMonthlyGoal from "./components/goals/monthlyGoals/ExtendedMonthlyGoal.tsx";
import CreateFirstGoal from "./components/goals/CreateFirstGoal.tsx";
import DisplayAllWeeklyGoals from "./components/goals/weeklyGoals/DisplayAllWeeklyGoals.tsx";
import DisplayAllDailyGoals from "./components/goals/dailyGoals/DisplayAllDailyGoals.tsx";
import PreviousExtendedMonthlyGoal from "./components/goals/monthlyGoals/PreviousExtendedMonthlyGoal.tsx";
import ExtendedWeeklyGoal from "./components/goals/weeklyGoals/ExtendedWeeklyGoal.tsx";
import ExtendedDailyGoal from "./components/goals/dailyGoals/ExtendedDailyGoal.tsx";
import DisplayAllRecipes from "./components/recipes/DisplayAllRecipes.tsx";
import RecipeNavbar from "./components/recipes/RecipeNavbar.tsx";
import DisplayRandomRecipes from "./components/recipes/DisplayRandomRecipes.tsx";
import RecipeElement from "./components/recipes/RecipeElement.tsx";
import ResetPasswordPage from "./components/auth/ResetPasswordPage.tsx";
import AdminDashboard from "./components/admin/AdminDashboard.tsx";
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
        path:"/resetPassword",
        element:<ResetPasswordPage/>
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
                path:"/Fitness/profile",
                element:<Profile />,
            },
            {
                path:"/Fitness/CreateProfile",
                element:<CreateProfile/>
            },
            {
                path:"/Fitness/calculator",
                element:<CalculatorNavBar/>,
                children:[
                    {
                        path:"/Fitness/calculator/bmi",
                        element:<BMICalculator/>
                    },
                    {
                        path: "/Fitness/calculator/protein",
                        element:<ProteinCalculator/>
                    },
                    {
                        path:"/Fitness/calculator/calories",
                        element:<CalorieCalculator/>
                    }
                ]
            },
            {
                path:"/Fitness/workouts",
                element:<DisplayWorkouts/>
            },
            {
                path:"/Fitness/workouts/:params",
                element:<WorkoutPage/>
            },
            {
                path:"/Fitness/goals",
                element:<GoalNavBar/>,
                children:[
                    {
                        path:"/Fitness/goals/monthlyGoals",
                        element:<DisplayGoals/>
                    },
                    {
                        path:"/Fitness/goals/monthlyGoals/:params",
                        element:<ExtendedMonthlyGoal/>
                    },
                    {
                        path:"/Fitness/goals/monthlyGoals/previous/:params",
                        element:<PreviousExtendedMonthlyGoal/>
                    },
                    {
                        path:"/Fitness/goals/weeklyGoals",
                        element:<DisplayAllWeeklyGoals/>
                    },
                    {
                        path:"/Fitness/goals/weeklyGoals/:params",
                        element:<ExtendedWeeklyGoal/>
                    },
                    {
                        path:"/Fitness/goals/dailyGoals",
                        element:<DisplayAllDailyGoals/>
                    },
                    {
                        path:"/Fitness/goals/dailyGoals/:params",
                        element:<ExtendedDailyGoal/>
                    },
                ]
            },
            {
                path:"/Fitness/createFirstGoal",
                element:<CreateFirstGoal/>
            },
            {
                path:"/Fitness/recipes",
                element:<RecipeNavbar/>,
                children:[
                    {
                        path: "/Fitness/recipes/search",
                        element: <DisplayAllRecipes/>
                    },
                    {
                        path: "/Fitness/recipes/random",
                        element: <DisplayRandomRecipes/>
                    },
                    {
                        path: "/Fitness/recipes/:params",
                        element: <RecipeElement/>
                    }
                ]
            },
            {
                path:"/Fitness/admin",
                element:<AdminDashboard/>
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
