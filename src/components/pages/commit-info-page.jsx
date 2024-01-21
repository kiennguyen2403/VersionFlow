import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadingButton } from "@mui/lab";

export default function CommitInfoPage({
  selectedCommit,
  setSelectedCommit,
  handleClick,
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
      <div style = {
        {
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          width: "100%",
        }
      }>
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
          Set miro board to this commit
        </LoadingButton>
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
          Use this commit as the latest version
        </LoadingButton>
      </div>
    </>
  );
}
