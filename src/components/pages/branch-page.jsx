"use client";
import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";

export const BranchPage = ({
  setCurrentCommit,
  getItems,
  currentCommit,
  selectedCommit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [branch, setBranch] = useState("");

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
        gap: "1rem",
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
            id="branch-name"
            label="Branch Name"
            multiline
            rows={1}
            variant="outlined"
            fullWidth
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
        <LoadingButton
          onClick={async () => {
            try {
              console.log("currentCommit", currentCommit);
              setIsLoading(true);
              const items = await getItems();
              if (selectedCommit?.body) {
                console.log("selectedCommit", selectedCommit);
                const [id, branchh] = selectedCommit.body.split(",");
                console.log("id", id);
                console.log("branch", branchh);
                const response = await axios.post(
                  "http://localhost:3000/api/commits",
                  {
                    message: "lol",
                    boardId: selectedCommit?.boardId ?? "board1",
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
                  message: "create branch " + branch,
                  branch: branch,
                  boardId: currentCommit?.boardId,
                  previousCommitId: currentCommit?.id,
                  action: "checkout",
                  content: items,
                }
              );
              // await addSticky();
              setIsLoading(false);
              setCurrentCommit("Initial commit");
            } catch (e) {
              console.log(e);
              setIsLoading(false);
            }
          }}
          loading={isLoading}
          variant="contained"
          size="small"
          //   endIcon={<UploadIcon fontSize="small" />}
        >
          Create branch
        </LoadingButton>
      </div>
    </div>
  );
};
