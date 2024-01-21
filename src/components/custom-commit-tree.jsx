"use client";
import React, { useState, useEffect } from "react";
import { Gitgraph } from "@gitgraph/react";
import axios from "axios";
import { graphOptions } from "./graph-options";
import { SampleCommitTree } from "./sample-commit-tree";

export const CustomCommitTree = ({
  currentCommit,
  setCurrentCommit,
  selectedCommit,
  setSelectedCommit,
  setValue,
}) => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRendered, setIsRendered] = useState(false);
  const boardId = "board1";
  const fetchDatas = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/commits?boardId=${boardId}`
      );
      const commits = response.data.commits;
      setCommits(commits);
      const commitsInMainBranch = commits.filter(
        (commit) => commit.branch === "main"
      );
      if (
        currentCommit === "Initial commit" &&
        commitsInMainBranch.length - 1
      ) {
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
      body: commit.id +","+ commit.branch +","+commit._id,
      onClick(commit) {
        setSelectedCommit(commit);
        setCurrentCommit(commit);
        setValue(0);
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
        <p>Loading...</p>
      ) : (
        <>
          {isRendered && commits.length > 0 && (
            <Gitgraph options={{}} key={JSON.stringify(commits)}>
              {(gitgraph) => {
                const branches = {};
                let currentBranch = gitgraph.branch("main");
                branches[currentBranch.name] = currentBranch;
                commits.forEach((commit) => {
                  if (
                    currentBranch.name === commit.branch &&
                    commit.action.toLowerCase() === "update"
                  ) {
                    currentBranch = branches[commit.branch];
                    currentBranch.commit(messageWithClick(commit));
                    
                  } else if (
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
          {/* <SampleCommitTree
            currentCommit={currentCommit}
            setCurrentCommit={setCurrentCommit}
            selectedCommit={selectedCommit}
            setSelectedCommit={setSelectedCommit}
            setValue={setValue}
          /> */}
        </>
      )}
    </div>
  );
};
