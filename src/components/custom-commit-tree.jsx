"use client";
import React, { useState, useEffect, use } from "react";
import { Gitgraph } from "@gitgraph/react";
import axios from "axios";
import { set } from "mongoose";

export const CustomCommitTree = () => {
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const commits = await axios.get("http://localhost:3000/api/commits");
        setCommits(commits.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDatas();
  });
  const graphGenerator = (gitgraph) => {
    let currentBranch = {
      object: gitgraph.branch("master"),
      id: null,
    };
    commits.forEach((commit) => {
      if (currentBranch.id === commit.branchID) {
        object.commit({
          subject: commit.commitMessage,
          onclick: () => {},
          onmouseover: () => {},
          onmouseout: () => {},
        });
      } else if (
        currentBranch.id !== commit.branchID &&
        commit.action.toLowerCase() === "checkout"
      ) {
        currentBranch.object = currentBranch.object.branch(commit.branchName);
        currentBranch.id = commit.branchID;
        currentBranch.object.commit({
          subject: commit.commitMessage,
          onclick: () => {},
          onmouseover: () => {},
          onmouseout: () => {},
        });
      } else if (
        currentBranch.id !== commit.branchID &&
        commit.action.toLowerCase() === "merge"
      ) {
        currentBranch.object.merge(commit.branchName);
        currentBranch.object.commit({
          subject: commit.commitMessage,
        });
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        width: "50vw",
      }}
    >
      <Gitgraph options={{}}>
        {(gitgraph) => {
          graphGenerator(gitgraph);
        }}
      </Gitgraph>
    </div>
  );
};
