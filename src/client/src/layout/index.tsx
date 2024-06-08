import { NavLink, Outlet } from "react-router-dom";

import LoginButton from "../pages/Profile/Login";

{/* <NavLink
  style={({ isActive, isPending }) => {
    return {
      color: isActive ? "red" : "inherit",
    };
  }}
  className={({ isActive, isPending }) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }}
/> */}

function Layout() {
    return (
        <div>
            <nav>
                <ul className="flex py-6 mx-12 justify-evenly">
                    <li>
                        <NavLink to="/"
                            className={({ isActive, isPending }) => {
                                return isActive ? "active" : isPending ? "pending" : "";
                            }}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/metar">Metar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/planner">Planner</NavLink>
                    </li>
                    <LoginButton />
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default Layout