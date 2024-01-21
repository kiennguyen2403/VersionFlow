"use client";
import React, { useState, useEffect } from "react";
import { Gitgraph } from "@gitgraph/react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { graphOptions } from "./graph-options";
import { SampleCommitTree } from "./sample-commit-tree";

const currentCommmitNodeStyle = {
  dot: { color: "#4caf50" },
};

const selectedCommitNodeStyle = {
  dot: { strokeWidth: 2, strokeColor: "#000" },
};

export const CustomCommitTree = ({
  currentCommit,
  setCurrentCommit,
  selectedCommit,
  setSelectedCommit,
  setValue,
  options,
  setOptions,
}) => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRendered, setIsRendered] = useState(false);
  const boardId = "board1";
  const fetchDatas = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/commits?boardId=${boardId}`);
      const commits = response.data.commits;
      setCommits(commits);
      console.log("commits", commits);
      const commitsInMainBranch = commits.filter((commit) => commit.branch === "main");
      if (currentCommit === "Initial commit" && commitsInMainBranch.length - 1) {
        setCurrentCommit(commitsInMainBranch[commitsInMainBranch.length - 1]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  };
  useEffect(() => {
    fetchDatas();
  }, [currentCommit]);

  function messageWithClick(commit) {
    const param = {
      subject: commit.message,
      body: commit.id + "," + commit.branch,
      onClick(commit) {
        setSelectedCommit(commit);
        setCurrentCommit(commit);
        setValue(0);
        console.log(commit);
      },
    };
    return param;
  }
  useEffect(() => {
    if (commits.length > 0) {
      setIsRendered(true);
    }
  }, [commits]);

  return (
    <div
      style={{
        width: "105%",
        height: "65vh",
        overflow: "auto",
        borderRight: "1px solid #cecece",
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          {isRendered && commits.length > 0 && (
            <Gitgraph options={options} key={JSON.stringify(commits)}>
              {(gitgraph) => {
                const branches = {};
                let currentBranch = gitgraph.branch("main");
                branches[currentBranch.name] = currentBranch;
                console.log(currentCommit.id);
                commits.forEach((commit) => {
                  if (
                    currentBranch.name === commit.branch &&
                    commit.action.toLowerCase() === "update"
                  ) {
                    currentBranch = branches[commit.branch];
                    currentBranch.commit({
                      ...messageWithClick(commit),
                      // Add color to current commit and selected commit
                      style: currentCommit.id == commit.id && currentCommmitNodeStyle,
                    });
                  }
                  /// TEST
                  else if (
                    currentBranch.name === commit.branch &&
                    commit.action.toLowerCase() === "checkout"
                  ) {
                    currentBranch.commit({
                      ...messageWithClick(commit),
                      // Add color to current commit and selected commit
                      style: currentCommit.id == commit.id && currentCommmitNodeStyle,
                    });
                  }
                  ////
                  else if (
                    currentBranch.name !== commit.branch &&
                    commit.action.toLowerCase() === "checkout"
                  ) {
                    branches[commit.branch] = currentBranch;
                    currentBranch = currentBranch.branch(commit.branch);
                    currentBranch.commit(messageWithClick(commit));
                  } else if (
                    currentBranch.name !== commit.branch &&
                    commit.action.toLowerCase() === "update"
                  ) {
                    currentBranch = branches[commit.branch];
                    currentBranch.commit(messageWithClick(commit));
                  }
                });
              }}
            </Gitgraph>
          )}
          <div
            style={{
              position: "sticky",
              bottom: 0,
              display: "flex",
              justifyContent: "end",
              paddingRight: "10px",
            }}
          ></div>
        </>
      )}
    </div>
  );
};
