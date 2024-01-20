"use client";
import React, { useState } from "react";
import { CustomCommitTree } from "./custom-commit-tree";
import { Typography } from "@mui/material";
import { HomePage } from "./home-page";
import CommitInfoPage from "./pages/commit-info-page";

export default function PageWrapper() {
  const [currentCommit, setCurrentCommit] = useState("Initial commit"); // change to commit hash later
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [value, setValue] = useState(0);
  console.log(selectedCommit);
  return (
    <>
      <div className="grid">
        <div className="cs1 ce12">
          <CustomCommitTree
            currentCommit={currentCommit}
            setCurrentCommit={setCurrentCommit}
            selectedCommit={selectedCommit}
            setSelectedCommit={setSelectedCommit}
            setValue={setValue}
          />
        </div>
        <div className="cs1 ce12">
          <HomePage
            selectedCommit={selectedCommit}
            setSelectedCommit={setSelectedCommit}
            value={value}
            setValue={setValue}
          />
        </div>
      </div>
    </>
  );
}
