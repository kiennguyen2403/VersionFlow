import React from "react";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CommitInfoPage({ selectedCommit, setSelectedCommit }) {
    // TODO: Update UI
    return (
        <>
            <Typography variant="body1" gutterBottom>
                Commit message: {selectedCommit.subject}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Author: {selectedCommit.author.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Date: {new Date(selectedCommit.author.timestamp).toDateString()}
            </Typography>
            <div>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    onClick={() => {
                        setSelectedCommit(null);
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
            </div>
        </>
    );
}
