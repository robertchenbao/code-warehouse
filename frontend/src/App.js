import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import logo from "./logo.svg"; // Tell webpack this JS file uses this image
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";

const drawerWidth = 260;

const SearchInput = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "60ch",
        },
    },
}));

export default function CodeWarehouseApp() {
    // the incoming data from backend (all code snippets)
    const [codeSnippets, setCodeSnippets] = useState(null);

    // the search keyword -- from user search input
    const [searchKeyword, setSearchKeyword] = useState("");

    const theme = useTheme();
    // Function for fetching data from forecasts api using location data from another endpoint

    // display the results on frontend
    function displayContent() {
        if (!codeSnippets) {
            return (
                <div>
                    <h1 className="text-center text-xl py-60">
                        Search for a code snippet from the menu above.
                        <br />
                        (For example, try "React".)
                    </h1>
                </div>
            );
        } else if (codeSnippets.length === 0) {
            return (
                <div>
                    <h1 className="text-center text-xl py-60">
                        No result found!
                    </h1>
                </div>
            );
        } else {
            return (
                <div>
                    {/* TODO: Build real code snippet card*/}
                    {codeSnippets.map((record, index) => (
                        <div key={index}>Hello there</div>
                    ))}
                </div>
            );
        }
    }

    // submit the search form
    function handleSearchSubmit(event) {
        const forecastUrl = `http://127.0.0.1:8000/api/read/snippet/?keyword=${searchKeyword}/`;
        fetch(forecastUrl, {
            // posts the form to users/me/items. You need to login to be able to send this
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCodeSnippets(data);
                console.log(data);
            });
        event.preventDefault();
    }

    // handle search value change -- update the current state if needed
    function handleSearchChange(event) {
        setSearchKeyword(event.target.value);
        console.log(event.target.value);
    }

    return (
        <div>
            <Box className="flex-grow">
                <AppBar position="fixed">
                    <Toolbar>
                        <img src={logo} width="50px" className="mr-4" />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className="w-60"
                            sx={{ display: { xs: "none", sm: "block" } }}
                        >
                            Code Warehouse
                        </Typography>
                        <div className="flex items-center w-full rounded-8 text-black">
                            <form onSubmit={handleSearchSubmit}>
                                <SearchInput
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchIcon className="ml-2" />
                                        </InputAdornment>
                                    }
                                    placeholder="Search for a code snippet..."
                                    inputProps={{ "aria-label": "search" }}
                                    className="bg-white rounded-lg text-sm shadow"
                                    type="text"
                                    value={searchKeyword}
                                    onChange={handleSearchChange}
                                />
                            </form>
                        </div>
                        <Box sx={{ flexGrow: 1 }} />
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="flex flex-row  w-full">
                <Box
                    component="nav"
                    sx={{
                        width: { sm: drawerWidth },
                        flexShrink: { sm: 0 },
                    }}
                    aria-label="mailbox folders"
                    style={{ zIndex: theme.zIndex.appBar - 1 }}
                >
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                        open
                    >
                        <Toolbar />
                        Hey
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    {displayContent()}
                </Box>
            </div>
        </div>
    );
}
