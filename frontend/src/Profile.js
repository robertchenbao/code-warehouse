import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import CodeAppBar from "./CodeAppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { logout } from "./warehouseService";
import { config } from "./Constants";

export default function Profile() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState(null);
    const token = localStorage.getItem("jwt_access_token");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${config.url}/api/read/users/me/`, {
                // posts the form to users/me/items. You need to login to be able to send this
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // this is the JWT to authenticate
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUserInfo(data);
            } else {
                // if cannot access user info: show an error message
                logout();
                navigate("/", { state: { openSnackbar: true } });
            }
        };
        fetchData();
    }, [token, navigate]);

    let currentDate = new Date();

    const displayUserData = (userInfo) => {
        if (userInfo) {
            return (
                <div>
                    <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8">
                            <Typography
                                variant="h6"
                                color="inherit"
                                className="flex-1"
                            >
                                General Information
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <div className="mb-8">
                            <Typography className="mb-4 text-15">
                                <b>Username</b>
                            </Typography>
                            <Typography>{userInfo.username}</Typography>
                        </div>

                        <div className="mb-8">
                            <Typography className="mb-4 text-15">
                                <b>Email</b>
                            </Typography>
                            <Typography>{userInfo.email}</Typography>
                        </div>
                    </CardContent>
                </div>
            );
        } else {
            return (
                <div className="flex flex-1 flex-col items-center justify-center p-12">
                    <Typography className="text-20 mb-16" color="textSecondary">
                        Loading...
                    </Typography>
                    <LinearProgress
                        className="w-xs max-w-full"
                        color="secondary"
                    />
                </div>
            );
        }
    };
    // Check if the token is present, AND has not expired
    // otherwise: go back to the main screen
    if (!token || jwt_decode(token).exp * 1000 < currentDate) {
        navigate("/");
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
            <CodeAppBar />
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
                    <Card
                        sx={{
                            borderRadius: "12px",
                            width: "100%",
                            marginBottom: "16px",
                        }}
                    >
                        {displayUserData(userInfo)}
                    </Card>
                </Box>
            </div>
        </Box>
    );
}
