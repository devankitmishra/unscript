// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#050f28",
      // temp1:"#5d83cf",
      // temp2:"#f2587b",
      // temp3:"#0f466e",
      // temp4:"#46c7cc",
      // temp5:"#fbbf49",
      // temp6:"#cc62b8",
      // temp7:"#fb984b",
      // temp8:"#050f28",
      brown: "#A0522D",
      light: "#D2691E",
      chocolate: "#8B4513",
      maroon: "#800000",
      wine: "#4A0404",
    },
    secondary: {
      main: "#3F51B5",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontSize: "3rem", fontWeight: 700 },
    h2: { fontSize: "2.5rem", fontWeight: 700 },
    body1: { fontSize: "1rem" },
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: "none",
          // padding: "8px 20px",
        },
      },
    },
    // MuiIconButton: {
    //   styleOverrides: {
    //     root: {
    //       color: "#FF4081",
    //     },
    //   },
    // },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 0,
    //     },
    //   },
    // },
    // MuiFilledInput: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 0,
    //     },
    //   },
    // },
    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: 0,
    //     },
    //   },
    // },
  },
});

export default theme;
