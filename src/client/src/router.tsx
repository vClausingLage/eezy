import { createBrowserRouter } from 'react-router-dom'

import Profile from "./pages/Profile";
import Layout from './pages/Layout';
import Metar from './pages/Metar';
import FlightPlanner from './pages/Planner';

import ErrorPage from './ErrorPage';

export const reactRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "profile",
                element: <Profile />,
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