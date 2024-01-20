"use client";
import React, { useState, useEffect, use } from "react";
import { Gitgraph } from "@gitgraph/react";
import axios from "axios";

export const CustomCommitTree = () => {
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get("http://localhost:3000/commits");
        setCommits(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCommits();
  });
  const graphGenerator = (gitgraph) => {
    let currentBranch = {
      object: gitgraph.branch("master"),
      id: null,
    }
    commits.forEach((commit) => {
      if (currentBranch.id  === commit.branchID) {
        object.commit(commit.commitMessage);
      } else if (currentBranch.id !== commit.branchID && commit.action.toLowerCase() === "checkout") {
        currentBranch.object = currentBranch.object.branch(commit.branchName);
        currentBranch.id = commit.branchID;
        currentBranch.object.commit(commit.commitMessage);
      } else if (currentBranch.id !== commit.branchID && commit.action.toLowerCase() === "merge") {
        currentBranch.object.merge(commit.branchName);
        currentBranch.object.commit(commit.commitMessage);
      }
    });
  };

  return (
    <div
      style={{
        width: "50%",
      }}
    >
      <Gitgraph>
        {(gitgraph) => {
          // Simulate git commands with Gitgraph API.
          const master = gitgraph.branch("master");
          master.commit("Initial commit");

          const develop = master.branch("develop");
          develop.commit("Add TypeScript");

          const aFeature = develop.branch("a-feature");
          aFeature
            .commit("Make it work")
            .commit("Make it right")
            .commit("Make it fast");

          develop.merge(aFeature);
          develop.commit("Prepare v1");

          master.merge(develop).tag("v1.0.0");
        }}
      </Gitgraph>
    </div>
  );
};
