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
      // console.log("commits", commits);
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

  const fetchCommit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/commits?_id=72ba1154-6c1f-439b-98ff-7f960bb33f73`
      );
      const res = response.data;
      console.log(res);
    } catch {
    } finally {
    }
  };
  useEffect(() => {
    fetchDatas();
  }, [currentCommit]);
  useEffect(() => {
    fetchCommit();
  }, []);

  function messageWithClick(commit) {
    const param = {
      subject: commit.message,
      body: commit.id + "," + commit.branch,
      onClick(commit) {
        setSelectedCommit(commit);
        console.log(selectedCommit);
        setCurrentCommit(commit);
        console.log(currentCommit);
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
            <Gitgraph options={graphOptions} key={JSON.stringify(commits)}>
              {(gitgraph) => {
                const branches = {};
                let currentBranch = gitgraph.branch("main");
                branches[currentBranch.name] = currentBranch;

                const processCommits = async () => {
                  for (const commit of commits) {
                    if (
                      currentBranch.name === commit.branch &&
                      commit.action.toLowerCase() === "update"
                    ) {
                      currentBranch.commit(messageWithClick(commit));
                    } else if (
                      currentBranch.name !== commit.branch &&
                      commit.action.toLowerCase() === "checkout"
                    ) {
                      try {
                        const response = await axios.get(
                          `http://localhost:3000/api/commits?_id=${commit.previousCommitId}`
                        );
                        const previousCommitBranch =
                          response.data.commit[0].branch;

                        if (previousCommitBranch === commit.branch) {
                          branches[commit.branch] = currentBranch;
                          currentBranch = currentBranch.branch(commit.branch);
                          currentBranch.commit(messageWithClick(commit));
                        } else {
                          currentBranch =
                            currentBranch.branch(previousCommitBranch);
                          currentBranch = currentBranch.branch(commit.branch);

                          currentBranch.commit(messageWithClick(commit));
                        }
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }
                };

                processCommits();
                return <div>Your Gitgraph component...</div>;
              }}
            </Gitgraph>
          )}
        </>
      )}
    </div>
  );
};
