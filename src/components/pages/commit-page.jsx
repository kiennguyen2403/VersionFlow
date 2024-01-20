import React, { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const CommitPage = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");

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
        id="commit-message"
        label="Commit Message"
        multiline
        rows={1}
        variant="outlined"
        value={commitMessage}
        onChange={(e) => setCommitMessage(e.target.value)}
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
        Commit
      </LoadingButton>
    </div>
  );
};
