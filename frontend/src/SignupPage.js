import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import CodeAppBar from "./CodeAppBar";
import Toolbar from "@mui/material/Toolbar";

function SignupPage() {
    const form = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            acceptTermsConditions: false,
        },
        onSubmit: async (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    function handleSubmit(ev) {
        ev.preventDefault();
    }

    return (
        <div className="flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0">
            <CodeAppBar />
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

            <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                <Toolbar />
                <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
                    <Typography variant="h6" className="md:w-full p-8">
                        CREATE AN ACCOUNT
                    </Typography>

                    <form
                        name="registerForm"
                        noValidate
                        className="flex flex-col justify-center w-full px-8"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            sx={{ marginBottom: "16px" }}
                            label="Name"
                            autoFocus
                            type="name"
                            name="name"
                            value={form.name}
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
                            name="passwordConfirm"
                            value={form.passwordConfirm}
                            onChange={form.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />

                        <FormControl
                            className="items-center"
                            sx={{ marginBottom: "4px" }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="acceptTermsConditions"
                                        checked={form.acceptTermsConditions}
                                        onChange={form.handleChange}
                                    />
                                }
                                label="I read and accept terms and conditions"
                            />
                        </FormControl>

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
                        <Link className="font-medium" to="/pages/auth/login-2">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignupPage;
