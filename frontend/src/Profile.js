import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import CodeAppBar from "./CodeAppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

export default function Profile() {
    const theme = useTheme();

    const [userInfo, setUserInfo] = useState(null);
    const token = localStorage.getItem("jwt_access_token");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `http://127.0.0.1:8000/api/read/users/me/`,
                {
                    // posts the form to users/me/items. You need to login to be able to send this
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // this is the JWT to authenticate
                    },
                }
            );
            const data = await response.json();
            setUserInfo(data);
        };
        fetchData();
    }, [token]);

    if (!userInfo) {
        return null;
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
                    </Card>
                </Box>
            </div>
        </Box>
    );
}
