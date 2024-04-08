import { NavLink, Outlet } from "react-router-dom";

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
            <p>App Layout</p>
            <nav>
                <ul className="flex gap-2">
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
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/metar">Metar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/nothing-here">Nothing Here</NavLink>
                    </li>
                </ul>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}

export default Layout