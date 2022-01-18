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
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";

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
    // info from the code snippet data
    const title = props.title;
    const content = props.content;
    const category = props.category;
    const pub_date = props.pub_date;

    return (
        <Card
            className="flex flex-col flex-1 my-4 mx-4 min-h-64"
            elevation={2}
            sx={{ borderRadius: 2 }}
        >
            <CardContent className="flex content-between flex-col mb-4">
                <Typography variant="h4">{title}</Typography>
                <Typography variant="body1">{content}</Typography>
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
                        className="w-12 h-4"
                    />
                </div>
                <Typography variant="body1">
                    Posted on {new Date(pub_date).toLocaleString()}
                </Typography>
            </CardActions>
        </Card>
    );
}

// dialog for posting new snippets
function PostDialog(props) {
    const { onClose, open } = props;

    const postForm = useFormik({
        initialValues: {
            snippetTitle: "",
            snippetCategory: 10,
            snippetDraft: "",
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleClose = () => {
        onClose(0);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            className="h-128 w-128"
            aria-label="post dialog"
        >
            <DialogTitle component="h3">Create a new snippet</DialogTitle>
            <DialogContent>
                Share your code snippet with people, helping them with
                programming questions!
            </DialogContent>

            <DialogContent>
                <form onSubmit={postForm.handleSubmit}>
                    <div className="flex flex-row justify-between">
                        <TextField
                            id="snippetTitle"
                            label="Title"
                            className="w-2/3"
                            sx={{ marginBottom: "8px" }}
                            onChange={postForm.handleChange}
                            value={postForm.values.snippetTitle}
                        />
                        <FormControl
                            className="w-1/4"
                            sx={{ marginBottom: "8px" }}
                        >
                            <InputLabel id="snippet-category-select-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="snippet-category-select-label"
                                id="snippetCategory"
                                label="Category"
                                onChange={postForm.handleChange}
                                value={postForm.values.snippetCategory}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <TextField
                        id="snippetDraft"
                        label="Snippet Draft"
                        multiline
                        className="w-full"
                        rows={16}
                        onChange={postForm.handleChange}
                        value={postForm.values.snippetDraft}
                    />
                    <DialogActions>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function CodeWarehouseApp() {
    const theme = useTheme();

    // dialog open/close
    const [open, setOpen] = React.useState(true);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // the incoming data from backend (all code snippets)
    const [codeSnippets, setCodeSnippets] = useState(null);

    // the search keyword -- from user search input
    const [searchKeyword, setSearchKeyword] = useState("");

    // the index of the side bar item; manage which item to be highlighted
    const [selectedIndex, setSelectedIndex] = React.useState();

    // shared function, for snippet searching
    async function searchForKeyword(searchURL) {
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

    function handleSidebarItemClick(event, category, index) {
        setSelectedIndex(index); // set the selected index
        setSearchKeyword(category);

        // start the search
        const searchURL = `http://127.0.0.1:8000/api/read/snippet/?keyword=${category}/`;
        searchForKeyword(searchURL);
        event.preventDefault();
    }

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
                    No result found!
                </Typography>
            );
        } else {
            return (
                <div className="flex justify-center flex-col overflow-auto">
                    {/* TODO: Display results in code snippet card*/}
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
        const searchURL = `http://127.0.0.1:8000/api/read/snippet/?keyword=${searchKeyword}/`;
        searchForKeyword(searchURL);
        event.preventDefault();
    }

    // handle search value change -- update the current state if needed
    function handleSearchChange(event) {
        setSearchKeyword(event.target.value);
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
                    <img src={logo} alt="logo" width="45px" className="mr-4" />
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
                    <Tooltip arrow title="Create a new snippet">
                        <Button
                            variant="contained"
                            color="secondary"
                            aria-label="create a new snippet"
                            onClick={handleOpenDialog}
                            startIcon={<AddIcon />}
                        >
                            POST
                        </Button>
                    </Tooltip>
                    <PostDialog open={open} onClose={handleCloseDialog} />
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
