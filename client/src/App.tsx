import { useMemo } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import "./CSS/App.css";

// import { useAuth0 } from "@auth0/auth0-react";
import store from "./features/redux/store";
import { Provider } from "react-redux";

import { Box, AppBar, Toolbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/";
import { getDesignTokens } from "./CSS/theme";

import AppFooter from "./AppFooter";
// import LoginButton from "./components/Authentcation/login";
// import LogoutButton from "./components/Authentcation/logout";
import Metar from "./components/Metar";
import Aircraft from "./components/Aircraft";
import FlightPlanner from "./components/FlightPlanner";
import IndexPage from "./components/Index/Index";

function App() {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const userID = "123456789";
  // const [userID, setUserID] = useState(""); //! uncomment

  // useEffect(() => {
  //   if (user?.sub !== undefined) setUserID(user.sub.match(/[0-9]/g)!.join(""));
  // });

  // const [mode, setMode] = useState("dark");
  // const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const theme = useMemo(() => createTheme(getDesignTokens()), []);

  let activeStyle = {
    backgroundColor: "#93A4C5",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <Box>
              <AppBar position="static">
                <Toolbar>
                  <nav className="nav-bar">
                    {/* <NavLink
                      to="/"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Home
                    </NavLink> */}
                    <NavLink
                      to="/"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Metar
                    </NavLink>
                    <NavLink
                      to="/aircraft"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Aircraft
                    </NavLink>
                    <NavLink
                      to="/flight-planner"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Flight Planner
                    </NavLink>
                    {/* {!isAuthenticated && !isLoading && <LoginButton />}
                  {isAuthenticated && !isLoading && <LogoutButton />} */}
                  </nav>
                </Toolbar>
              </AppBar>
            </Box>

            <Routes>
              {/* <Route path="/" element={<IndexPage />} /> */}

              <Route path="/" element={<Metar />} />
              <Route path="aircraft" element={<Aircraft userID={userID} />} />
              <Route path="flight-planner" element={<FlightPlanner />} />
            </Routes>
          </Provider>
        </BrowserRouter>
        <AppFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
