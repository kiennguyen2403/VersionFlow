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
            Branch: {selectedCommit?.branches[0] ?? ""}
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
              await handleClick(0);
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
              const response = await axios.post(
                "http://localhost:3000/api/commits",
                {
                  items,
                  message: currentCommit.messsage,
                  branch: "master",
                  boardId: currentCommit.boardId,
                  previousCommitId: currentCommit.id,
                  action: "checkout",
                  content: items,
                }
              );
              // await addSticky();
              setIsLoading(false);
              setCurrentCommit(response.data);
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
