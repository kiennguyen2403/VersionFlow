"use client";
import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const BranchPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [branch, setBranch] = useState("");

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
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ width: '80%' }}>
                    <TextField
                        id="branch-name"
                        label="Branch Name"
                        multiline
                        rows={1}
                        variant="outlined"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
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
                    Create branch
                </LoadingButton>
            </div>
        </div>
    );
};
