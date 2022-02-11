import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import PostDialog from "./PostDialog";
import jwt_decode from "jwt-decode";
import { MenuList } from "@mui/material";
import { logout } from "./warehouseService";

export default function AccountMenu() {
    // control the account circle component
    const navigate = useNavigate();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        // navigate to profile page
        navigate("/profile");
    };

    // dialog open/close
    const [open, setOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // if the user is logged in (initialized as false)
    const token = localStorage.getItem("jwt_access_token");

    let currentDate = new Date();
    // Check if the token is present, AND has not expired
    if (token && jwt_decode(token).exp * 1000 >= currentDate) {
        return (
            <div className="flex flex-row items-center">
                <Tooltip arrow title="Create a new snippet">
                    <Button
                        variant="contained"
                        size="medium"
                        aria-label="create a new snippet"
                        onClick={handleOpenDialog}
                        color="secondary"
                        startIcon={<AddIcon />}
                    >
                        New
                    </Button>
                </Tooltip>
                <PostDialog open={open} onClose={handleCloseDialog} />
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    sx={{
                        color: theme.palette.background.main,
                    }}
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuList
                        sx={{
                            paddingY: "6px",
                            paddingX: "16px",
                        }}
                    >
                        <b>Welcome, {localStorage.getItem("username")}!</b>
                    </MenuList>
                    <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                    <MenuItem
                        onClick={() => {
                            logout();
                            // update the page state
                            window.location.reload();
                        }}
                    >
                        Log out
                    </MenuItem>
                </Menu>
            </div>
        );
    } else {
        return (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    navigate("/login");
                }}
            >
                Login
            </Button>
        );
    }
}
