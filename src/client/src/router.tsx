import { createBrowserRouter } from 'react-router-dom'

import Profile from "./pages/Profile";
import Login from './pages/Profile/Login';
import Layout from './pages/Navigation/Layout';
import Metar from './pages/Metar';

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
            }
        ]
    },

]);