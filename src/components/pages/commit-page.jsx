import React, { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export const CommitPage = ({ setCurrentCommit, getItems, currentCommit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");

  return (
    <div
      style={{
        marginTop: "0.5rem",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <TextField
            id="commit-message"
            label="Commit Message"
            multiline
            rows={1}
            variant="outlined"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            fullWidth
          />
        </div>
        <LoadingButton
          onClick={async () => {
            try {
              setIsLoading(true);
              const items = await getItems();
              if (currentCommit?.body) {
                console.log("currentCommit", currentCommit);
                const [id, branch] = currentCommit.body.split(",");
                console.log("id", id);
                console.log("branch", branch);
                const response = await axios.post(
                  "http://localhost:3000/api/commits",
                  {
                    message: commitMessage,
                    boardId: currentCommit?.boardId ?? "board1",
                    branch: branch,
                    previousCommitId: id,
                    action: "checkout",
                    content: items,
                  }
                );
                setCurrentCommit("Initial commit");
                setIsLoading(false);
                return;
              }
              const response = await axios.post(
                "http://localhost:3000/api/commits",
                {
                  message: commitMessage,
                  boardId: currentCommit?.boardId ?? "board1",
                  branch: currentCommit?.branch ?? "main",
                  previousCommitId: currentCommit?.id ?? "first commit",
                  action: "update",
                  content : items
                }
              );
              setCurrentCommit("Initial commit");
              setIsLoading(false);
              // setCurrentCommit(commitMessage);
            } catch (e) {
              console.log(e);
              setIsLoading(false);
            }
          }}
          loading={isLoading}
          variant="contained"
          size="small"
          fullWidth
          //   endIcon={<SendIcon fontSize="small" />}
        >
          Commit
        </LoadingButton>
      </div>
    </div>
  );
};
