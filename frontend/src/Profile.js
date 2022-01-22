import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "./logo.svg"; // Tell webpack this JS file uses this image
import { useTheme } from "@mui/material/styles";
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";

export default function Profile() {
    const theme = useTheme();

    function displayContent() {
        return <p>Hey from the profile page!</p>;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                flexGrow: 1,
                backgroundColor: theme.palette.background.main,
            }}
        >
            <AppBar position="fixed">
                <Toolbar>
                    <Link
                        to="/"
                        className="flex flex-row items-center no-underline"
                    >
                        <img
                            src={logo}
                            alt="logo"
                            width="45px"
                            className="mr-4"
                        />
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
            <div className="flex flex-row w-full">
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        width: { sm: "100%" },
                    }}
                >
                    <Toolbar />
                    {displayContent()}
                </Box>
            </div>
        </Box>
    );
}
