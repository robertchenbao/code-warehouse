import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "./logo.svg"; // Tell webpack this JS file uses this image
import { useTheme } from "@mui/material/styles";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";

export default function CodeAppBar() {
    const theme = useTheme();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Link
                    to="/"
                    className="flex flex-row items-center no-underline"
                >
                    <img src={logo} alt="logo" width="45px" className="mr-4" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        className="w-60 hidden md:block"
                    >
                        Code Warehouse
                    </Typography>
                </Link>

                <Box sx={{ flexGrow: 1 }} />

                <AccountMenu />
            </Toolbar>
        </AppBar>
    );
}
