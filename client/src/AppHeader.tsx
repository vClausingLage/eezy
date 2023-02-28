import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { NavLink } from "react-router-dom";

function AppHeader() {
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <Box>
      <nav>
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
    </Box>
  );
}

export default AppHeader;
