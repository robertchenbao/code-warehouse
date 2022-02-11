import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
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
import Divider from "@mui/material/Divider";
import AccountMenu from "./AccountMenu";
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "markdown-to-jsx";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { config } from "./Constants";

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
function MarkdownListItem(props) {
    return (
        <Box component="li" sx={{ mt: 1, typography: "body1" }} {...props} />
    );
}

function CodeSnippetCard(props) {
    // info from the code snippet data
    const title = props.title;
    const content = props.content;
    const category = props.category;
    const pub_date = props.pub_date;

    const markdownStyleOptions = {
        overrides: {
            span: {
                component: Typography,
            },
            h1: {
                component: Typography,
                props: {
                    gutterBottom: true,
                    variant: "h4",
                    component: "h1",
                },
            },
            h2: {
                component: Typography,
                props: { gutterBottom: true, variant: "h6", component: "h2" },
            },
            h3: {
                component: Typography,
                props: { gutterBottom: true, variant: "subtitle1" },
            },
            h4: {
                component: Typography,
                props: {
                    gutterBottom: true,
                    variant: "caption",
                    paragraph: true,
                },
            },
            p: {
                component: Typography,
                props: { paragraph: true },
            },
            a: { component: Link },
            li: {
                component: MarkdownListItem,
            },
        },
    };

    return (
        <Card
            className="flex flex-col flex-1 my-4 mx-4 min-h-64"
            elevation={2}
            sx={{ borderRadius: 2 }}
        >
            <CardContent className="flex content-between flex-col mb-4">
                <Typography variant="h4">{title}</Typography>
                <ReactMarkdown options={markdownStyleOptions}>
                    {content}
                </ReactMarkdown>
            </CardContent>
            <Divider />
            <CardActions className="flex justify-between mt-auto m-2">
                <div className="flex flex-row items-center">
                    <Typography variant="body1" className="pr-4">
                        Language/Framework:
                    </Typography>
                    <Chip
                        label={category}
                        color="secondary"
                        className="w-22 h-4"
                    />
                </div>
                <Typography variant="body1">
                    Posted on{" "}
                    {new Date(pub_date).toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </Typography>
            </CardActions>
        </Card>
    );
}

export default function CodeWarehouseApp() {
    const theme = useTheme();

    const location = useLocation();

    // open the snackbar notification, based on the URL's state
    const [snackbarOpen, setSnackbarOpen] = useState(
        location.state ? location.state.openSnackbar : false
    );

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    // the incoming data from backend (all code snippets)
    const [codeSnippets, setCodeSnippets] = useState(null);

    // the search keyword -- from user search input
    const [searchKeyword, setSearchKeyword] = useState("");

    // the index of the side bar item; manage which item to be highlighted
    const [selectedIndex, setSelectedIndex] = React.useState();

    // shared function, for snippet searching
    async function searchSnippets(keyword) {
        const searchURL = `${config.url}/api/read/snippet/?keyword=${keyword}/`;

        // get the data from URL
        const response = await fetch(searchURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        // save the data
        const data = await response.json();
        setCodeSnippets(data);
    }

    //
    function handleSidebarItemClick(event, category, index) {
        setSelectedIndex(index); // set the selected index
        setSearchKeyword(category);

        // start the search
        searchSnippets(category);
        event.preventDefault();
    }

    // display the latest snippets, when the page loads
    useEffect(() => {
        async function fetchLatestPosts() {
            const latestURL = `${config.url}/api/read/latest-snippets/`;
            // get the data from URL
            const response = await fetch(latestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // save the data to react state
            const data = await response.json();
            setCodeSnippets(data);
        }

        fetchLatestPosts();
    }, [snackbarOpen]);

    // display the results on frontend
    function displayContent() {
        if (!codeSnippets) {
            return (
                <Typography
                    variant="h5"
                    component="div"
                    className="text-center text-xl py-60"
                >
                    Search for a code snippet from the menu above.
                    <br />
                    (For example, try "React".)
                </Typography>
            );
        } else if (codeSnippets.length === 0) {
            return (
                <Typography
                    variant="h5"
                    component="div"
                    className="text-center text-xl py-60"
                >
                    No results found! 😕
                </Typography>
            );
        } else {
            return (
                <div className="flex justify-center flex-col overflow-auto">
                    {codeSnippets.map((record, index) => (
                        <CodeSnippetCard
                            key={index}
                            title={record.title}
                            content={record.content}
                            category={record.category}
                            pub_date={record.pub_date}
                        />
                    ))}
                </div>
            );
        }
    }

    // submit the search form
    function handleSearchSubmit(event) {
        console.log("RUNNING handleSearchSubmit");
        searchSnippets(searchKeyword);
        event.preventDefault();
    }

    // handle search value change -- update the current state if needed
    function handleSearchChange(event) {
        setSearchKeyword(event.target.value);
        setSelectedIndex(false);
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    variant="filled"
                    elevation={4}
                >
                    Please log back in to access your profile!
                </Alert>
            </Snackbar>
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
                    {/* AccountMenu */}
                    <AccountMenu />
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
                                    "JS",
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
                                            <SourceIcon
                                                color={
                                                    // highlight the icon if it's selected
                                                    selectedIndex === index
                                                        ? "secondary"
                                                        : "primary"
                                                }
                                            />
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
