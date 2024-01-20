"use client";
import { useState, useEffect, use } from "react";
import { CustomCommitTree } from "../components/custom-commit-tree";
import { HomePage } from "../components/home-page";

const Main = () => {
  const [boardId, setBoardId] = useState("");
  useEffect(() => {
    async function getBoard() {
      const {id} = await miro.board.getInfo();
      setBoardId(id);
    }
    getBoard();
  },[]);

  return (
    boardId && <>
      <div className="cs1 ce12">
        <CustomCommitTree />
      </div>
      <div className="cs13 ce24">
        <HomePage board_id={boardId} />
      </div>
    </>
  );
};

export default Main;
