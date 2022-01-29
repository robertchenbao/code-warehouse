import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import CodeAppBar from "./CodeAppBar";
import Toolbar from "@mui/material/Toolbar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginPage() {
    const navigate = useNavigate();

    // control open/close the notification
    const [openNotification, setOpenNotification] = useState(false);

    const handleNotificationClose = (event, reason) => {
        // do not close the notification if it's click away
        if (reason === "clickaway") {
            return;
        }

        setOpenNotification(false);
    };

    // log in form: including username and password
    const form = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            // send the login data to backend
            const postURL = "http://127.0.0.1:8000/api/login/";
            const response = await fetch(postURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                setOpenNotification(true);
                // save the token in localStorage
                let token = data.access;
                localStorage.setItem("jwt_access_token", token);
                // extract the username; save it to local storage
                if (token) {
                    let username = jwt_decode(token).username;
                    localStorage.setItem("username", username);
                }
                await new Promise((r) => setTimeout(r, 1000));
                navigate("/");
            }
        },
    });

    return (
        <div className="flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0">
            <CodeAppBar />
            <Snackbar
                open={openNotification}
                autoHideDuration={6000}
                onClose={handleNotificationClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleNotificationClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Logged in! Redirecting to the search page...
                </Alert>
            </Snackbar>
            <div className="flex flex-col flex-grow-0 items-center text-center lg:px-24 lg:py-36 md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
                <Typography variant="h3" color="inherit" className="text-left">
                    Welcome to Code Warehouse!
                </Typography>

                <Typography
                    variant="subtitle1"
                    color="inherit"
                    className="max-w-512 text-left"
                    sx={{ marginTop: "16px" }}
                >
                    Log into your account to view your own posts, and share your
                    snippets with others.
                </Typography>
            </div>

            <Box className="w-full max-w-400 mx-auto m-16 md:m-0">
                <Toolbar />
                <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
                    <Typography variant="h6" className="md:w-full p-8">
                        LOGIN TO YOUR ACCOUNT
                    </Typography>

                    <form
                        name="registerForm"
                        noValidate
                        className="flex flex-col justify-center w-full px-8 pb-12"
                        onSubmit={form.handleSubmit}
                    >
                        <TextField
                            sx={{ marginBottom: "16px" }}
                            label="Username"
                            autoFocus
                            type="username"
                            name="username"
                            value={form.username}
                            onChange={form.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />

                        <TextField
                            sx={{ marginBottom: "16px" }}
                            label="Password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={form.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            className="w-full mx-auto mt-16"
                            aria-label="Log in"
                            type="submit"
                        >
                            LOGIN
                        </Button>
                    </form>

                    <div className="flex flex-col items-center justify-center pt-60 pb-12">
                        <span className="font-medium">
                            Don't have an account?
                        </span>
                        <Link className="font-medium" to="/signup">
                            Create an account
                        </Link>
                    </div>
                </CardContent>
            </Box>
        </div>
    );
}

export default LoginPage;
