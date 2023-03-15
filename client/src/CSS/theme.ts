import {} from "@mui/material/colors";

export const getDesignTokens = (mode?: any) => ({
  typography: {
    fontSize: 16,
  },
  palette: {
    primary: {
      main: "#4C689F", // #20788d #495c75 #568395 #8495b0
    },
    secondary: {
      main: "#121212",
    },
    error: {
      main: "#f12800",
    },
    warning: {
      main: "#ea4f02",
    },
    info: {
      main: "#f2ff00",
    },
    paper: {
      main: "#ffeecb",
    },
  },
});
