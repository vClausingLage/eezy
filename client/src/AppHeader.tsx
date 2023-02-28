import { NavLink } from "react-router-dom";

function AppHeader() {
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <nav>
      <p>hello</p>
      <ul>
        <li>
          <NavLink
            to="metar"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Metar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="aircraft"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Aircraft
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppHeader;
