import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SourceIcon from "@mui/icons-material/Source";
import List from "@mui/material/List";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
const drawerWidth = 260;

const SearchInput = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "600px",
        },
    },
}));

/*
Display the code snippets in tiles/cards
*/
function CodeSnippetCard(props) {
    const title = props.title;
    const content = props.content;
    const category = props.category;
    return (
        <Card
            className="my-6 mx-6 h-128"
            elevation={2}
            sx={{ borderRadius: 3 }}
        >
            <CardContent className="flex content-between flex-col">
                <Typography variant="h4">{title}</Typography>
                <Typography variant="body1">{content}</Typography>
                <Chip
                    label={category}
                    color="secondary"
                    className="w-16 mt-4"
                />
            </CardContent>
        </Card>
    );
}

export default function CodeWarehouseApp() {
    const history = useNavigate();

    // the incoming data from backend (all code snippets)
    const [codeSnippets, setCodeSnippets] = useState(null);

    // the search keyword -- from user search input
    const [searchKeyword, setSearchKeyword] = useState("");

    // the index of the side bar item; manage which item to be highlighted
    const [selectedIndex, setSelectedIndex] = React.useState();

    function handleSidebarItemClick(ev, searchKeyword, index) {
        setSelectedIndex(index);
        console.log("searchKeyword: " + searchKeyword);
        ev.preventDefault();
        // TODO: Add backend call to get search rsults
    }
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
                <div className="flex justify-center flex-col overflow-auto">
                    {/* TODO: Build real code snippet card*/}
                    {codeSnippets.map((record, index) => (
                        <CodeSnippetCard
                            key={index}
                            title={record.title}
                            content={record.content}
                            category={record.category}
                        />
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
                    <img src={logo} width="45px" className="mr-4" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        className="w-60 hidden md:block"
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
                                className="rounded-lg text-sm shadow"
                                sx={{
                                    backgroundColor:
                                        theme.palette.background.main,
                                }}
                                type="text"
                                value={searchKeyword}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        aria-label="add"
                        color="background"
                        onClick={() => history.push("/new-snippet")}
                    >
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className="flex flex-row w-full">
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
                        <div>
                            <h4 className="px-4 mt-6 mb-2 font-semibold">
                                By Categories
                            </h4>
                            <List>
                                {[
                                    "Python",
                                    "JavaScript",
                                    "Java",
                                    "C++",
                                    "Go",
                                    "Scala",
                                ].map((text, index) => (
                                    <ListItem
                                        button
                                        key={text}
                                        sx={{
                                            height: 40,
                                            width: "calc(100% - 4px)",
                                            marginY: "2px",
                                            borderRadius: "0 20px 20px 0",
                                            paddingRight: 12,
                                            cursor: "pointer",
                                            textDecoration: "none!important",
                                        }}
                                        selected={selectedIndex === index}
                                        onClick={(event) =>
                                            handleSidebarItemClick(
                                                event,
                                                text,
                                                index
                                            )
                                        }
                                    >
                                        <ListItemIcon>
                                            <SourceIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    {displayContent()}
                </Box>
            </div>
        </Box>
    );
}
