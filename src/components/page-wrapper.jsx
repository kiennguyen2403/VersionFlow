"use client";
import React, { useState, useEffect } from "react";
import { CustomCommitTree } from "./custom-commit-tree";
import { Typography } from "@mui/material";
import { HomePage } from "./home-page";
import CommitInfoPage from "./pages/commit-info-page";

export default function PageWrapper() {
  const [currentCommit, setCurrentCommit] = useState("Initial commit"); // change to commit hash later
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [value, setValue] = useState(0);
  const [boardId, setBoardId] = useState("");
  const [options, setOptions] = useState({
    template: "metro",
  });

  useEffect(() => {
    async function getBoard() {
      const { id } = await miro.board.getInfo();
      setBoardId(id);
    }
    getBoard();
  }, []);

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
            options={options}
            setOptions={setOptions}
          />
        </div>
        <div className="cs1 ce12">
          <HomePage
            selectedCommit={selectedCommit}
            setSelectedCommit={setSelectedCommit}
            currentCommit={currentCommit}
            setCurrentCommit={setCurrentCommit}
            value={value}
            setValue={setValue}
            board_id={boardId}
          />
        </div>
      </div>
    </>
  );
}
