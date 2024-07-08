import { createBrowserRouter } from 'react-router-dom'

import Profile from "../pages/Profile"
import Layout from './index'
import Metar from '../pages/Metar'
import FlightPlanner from '../pages/Planner'

import ErrorPage from '../ErrorPage'

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
                element: <FlightPlanner />
            },
            {
                path: "nothing-here",
                element: <div>Nothing Here</div>
            }
        ]
    }
])