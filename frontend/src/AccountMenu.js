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

export default function AccountMenu() {
    // control the account circle component
    const navigate = useNavigate();
    const theme = useTheme();

    // if the user is logged in (initialized as false)
    // TODO: use localStorage to check login status
    let auth = false;

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

    if (auth) {
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
                    <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
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
