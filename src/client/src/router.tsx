import { createBrowserRouter } from 'react-router-dom'

import Profile from "./pages/Profile";
import Login from './pages/Profile/Login';
import Layout from './pages/Layout';
import Metar from './pages/Metar';
import FlightPlanner from './pages/Planner';

export const reactRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "metar",
                element: <Metar />
            },
            {
                path: "planner",
                element: <FlightPlanner />,
                children: [
                    {
                        path: "add",
                        element: <div>Add Aircraft</div>
                    },
                    {
                        path: "edit",
                        element: <div>Edit Aircraft</div>
                    },
                    {
                        path: "list",
                        element: <div>List Aircraft</div>
                    }
                ],
            },
            {
                path: "nothing-here",
                element: <div>Nothing Here</div>
            }
        ]
    },

]);