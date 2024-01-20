import React, { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const CommitPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [commitMessage, setCommitMessage] = useState("");

    return (
        <div
            style={{
                marginTop: "2rem",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
            }}
        >
            <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ width: "80%" }}>
                    <TextField
                        id="commit-message"
                        label="Commit Message"
                        multiline
                        rows={1}
                        variant="outlined"
                        value={commitMessage}
                        onChange={(e) => setCommitMessage(e.target.value)}
                    />
                </div>
                <LoadingButton
                    onClick={async () => {
                        setIsLoading(true);
                        await addSticky();
                        setIsLoading(false);
                    }}
                    loading={isLoading}
                    variant="contained"
                    size="small"
                >
                    Commit
                </LoadingButton>
            </div>
        </div>
    );
};
