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
import BMICalculator from "./components/Calculators/BMI/BMICalculator.tsx";
import CalculatorNavBar from "./components/Calculators/CalculatorNavBar.tsx";
import ProteinCalculator from "./components/Calculators/protein/ProteinCalculator.tsx";
import CalorieCalculator from "./components/Calculators/calories/CalorieCalculator.tsx";
import DisplayWorkouts from "./components/workouts/DisplayWorkouts.tsx";
import WorkoutPage from "./components/workouts/WorkoutPage.tsx";
import DisplayGoals from "./components/goals/DisplayGoals.tsx";
import GoalNavBar from "./components/goals/GoalNavBar.tsx";
import ExtendedMonthlyGoal from "./components/goals/monthlyGoals/ExtendedMonthlyGoal.tsx";
import CreateFirstGoal from "./components/goals/CreateFirstGoal.tsx";
import DisplayAllWeeklyGoals from "./components/goals/weeklyGoals/DisplayAllWeeklyGoals.tsx";
import DisplayAllDailyGoals from "./components/goals/dailyGoals/DisplayAllDailyGoals.tsx";
import PreviousExtendedMonthlyGoal from "./components/goals/monthlyGoals/PreviousExtendedMonthlyGoal.tsx";
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
                        path:"/Fitness/goals/dailyGoals",
                        element:<DisplayAllDailyGoals/>
                    }
                ]
            },
            {
                path:"/Fitness/createFirstGoal",
                element:<CreateFirstGoal/>
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
