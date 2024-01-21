import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

export default function CommitInfoPage({
  selectedCommit,
  setSelectedCommit,
  handleClick,
  getItems,
  currentCommit,
  setCurrentCommit,
}) {
  // TODO: Update UI
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {selectedCommit ? (
        <>
          <Typography variant="body1" gutterBottom>
            Commit message: {selectedCommit?.subject ?? ""}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Author: {selectedCommit?.author.name ?? ""}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Date:{" "}
            {new Date(selectedCommit?.author?.timestamp).toDateString() ?? ""}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            No commit selected
          </Typography>
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          width: "100%",
        }}
      >
        <LoadingButton
          onClick={async () => {
            try {
              setIsLoading(true);
              const metadata = selectedCommit.body.split(",");
              await handleClick(metadata[2]);
              setIsLoading(false);
            } catch (e) {
              console.log(e);
              setIsLoading(false);
            }
          }}
          isLoading={isLoading}
          variant="contained"
          size="small"
          fullWidth
        >
          Sync mirro with this commit
        </LoadingButton>
        <LoadingButton
          onClick={async () => {
            try {
              setIsLoading(true);
              const items = await getItems();
              if (currentCommit?.body) {
                console.log("currentCommit", currentCommit);
                const [id, branch] = currentCommit.body.split(",");
                const response = await axios.post(
                  "http://localhost:3000/api/commits",
                  {
                    message: currentCommit?.subject ?? "",
                    boardId: currentCommit?.boardId ?? "board1",
                    branch: "main",
                    previousCommitId: id,
                    action: "cherry-pick",
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
                  branch: "main",
                  previousCommitId: currentCommit?.id ?? "first commit",
                  action: "checkout",
                  content: items,
                }
              );
              setCurrentCommit("Initial commit");
              setIsLoading(false);
            } catch (e) {
              console.log(e);
              setIsLoading(false);
            }
          }}
          isLoading={isLoading}
          variant="contained"
          size="small"
          fullWidth
        >
          Use this commit as the latest version
        </LoadingButton>
      </div>
    </>
  );
}
