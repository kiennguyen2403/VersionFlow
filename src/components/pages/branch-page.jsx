"use client";
import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const BranchPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [branch , setBranch] = useState("");

    return (
      <div
        style={{
          marginTop: "5rem",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <TextField
          id="branch-name"
          label="Branch Name"
          multiline
          rows={1}
          variant="outlined"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <LoadingButton
          onClick={async () => {
            setIsLoading(true);
            await addSticky();
            setIsLoading(false);
          }}
          loading={isLoading}
          variant="contained"
        >
          Create branch
        </LoadingButton>
      </div>
    );

}