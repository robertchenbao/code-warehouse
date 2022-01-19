import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import PostDialog from "./PostDialog";

export default function AccountMenu() {
    // control the account circle component
    const navigate = useNavigate();
    const theme = useTheme();

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

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

    // dialog control

    const [open, setOpen] = React.useState(true);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    if (auth) {
        return (
            <div className="flex flex-row">
                <Tooltip arrow title="Create a new snippet">
                    <IconButton
                        variant="contained"
                        size="large"
                        aria-label="create a new snippet"
                        onClick={handleOpenDialog}
                        sx={{
                            color: theme.palette.background.main,
                        }}
                    >
                        <AddIcon />
                    </IconButton>
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
    }
}
