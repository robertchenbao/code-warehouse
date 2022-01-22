import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import CodeAppBar from "./CodeAppBar";

export default function Profile() {
    const theme = useTheme();

    function displayContent() {
        return <p>Hey from the profile page!</p>;
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
            <CodeAppBar />
            <div className="flex flex-row w-full">
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        width: { sm: "100%" },
                    }}
                >
                    <Toolbar />
                    {displayContent()}
                </Box>
            </div>
        </Box>
    );
}
