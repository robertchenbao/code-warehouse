import { createTheme } from "@mui/material/styles";

export const CodeWarehouseTheme = createTheme({
    palette: {
        primary: {
            main: "#30475e",
        },
        secondary: {
            main: "#F05454",
        },
        background: {
            main: "#F5F5F5",
        },
    },
    typography: {
        h4: {
            fontFamily: "Roboto Slab",
            fontWeight: 300,
        },
        h6: {
            fontFamily: "Roboto Slab",
        },
    },
});
