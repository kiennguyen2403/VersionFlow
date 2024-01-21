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
      setCommits(response.data.commits);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  };
  useEffect(() => {
    fetchDatas();
  }, []);
  function messageWithClick(message) {
    const param = {
      subject: message,
      onClick(commit) {
        setSelectedCommit(commit);
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
            <Gitgraph options={{}}>
              {(gitgraph) => {
                let currentBranch = gitgraph.branch("main");
                commits.forEach((commit) => {
                  console.log(commit);
                  if (currentBranch.name === commit.branch) {
                    console.log("matched branch");
                    currentBranch.commit(messageWithClick(commit.message));
                  } else if (
                    currentBranch.name !== commit.branch &&
                    commit.action.toLowerCase() === "checkout"
                  ) {
                    currentBranch = currentBranch.branch(commit.branch);
                    currentBranch.commit(messageWithClick(commit.message));
                  } 
                  // else if (
                  //   currentBranch.name !== commit.branch &&
                  //   commit.action.toLowerCase() === "update"
                  // ) {
                  //   currentBranch.branch(commit.branch).commit({
                  //     subject: commit.message,
                  //     onclick: () => {},
                  //     onmouseover: () => {},
                  //     onmouseout: () => {},
                  //   });
                  // }
                });
              }}
            </Gitgraph>
          )}
          x
          <SampleCommitTree
            currentCommit={currentCommit}
            setCurrentCommit={setCurrentCommit}
            selectedCommit={selectedCommit}
            setSelectedCommit={setSelectedCommit}
            setValue={setValue}
          />
        </>
      )}
    </div>
  );
};
