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
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { config } from "./Constants";

function SignupPage() {
    const navigate = useNavigate();

    const form = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            password2: "",
        },
        onSubmit: async (values) => {
            const postURL = `${config.url}/api/register/`;
            const response = await fetch(postURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                setSnackbarOpen(true);
                await new Promise((r) => setTimeout(r, 1000));
                navigate("/login");
            }
        },
    });

    // handle the success notification
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <div className="flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0">
            <CodeAppBar />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    elevation={4}
                >
                    Your account is created!
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
                    Manage and share your code snippets with an account.
                    Moreover, search for all the snippets other users posted.
                </Typography>
            </div>

            <Box className="w-full max-w-400 mx-auto m-16 md:m-0">
                <Toolbar />
                <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
                    <Typography variant="h6" className="md:w-full p-8">
                        CREATE AN ACCOUNT
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
                            label="Email"
                            type="email"
                            name="email"
                            value={form.email}
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

                        <TextField
                            sx={{ marginBottom: "16px" }}
                            label="Password (Confirm)"
                            type="password"
                            name="password2"
                            value={form.password2}
                            onChange={form.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            className="w-full mx-auto mt-16"
                            aria-label="Register"
                            type="submit"
                        >
                            CREATE AN ACCOUNT
                        </Button>
                    </form>

                    <div className="flex flex-col items-center justify-center pt-24 pb-12">
                        <span className="font-medium">
                            Already have an account?
                        </span>
                        <Link className="font-medium" to="/login">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Box>
        </div>
    );
}

export default SignupPage;
