"use client";
import React, { useState, useEffect } from "react";
import { Gitgraph } from "@gitgraph/react";
import axios from "axios";
import { SampleCommitTree } from "./sample-commit-tree";

export const CustomCommitTree = ({
    currentCommit,
    setCurrentCommit,
    selectedCommit,
    setSelectedCommit,
}) => {
    const [commits, setCommits] = useState([]);
    const boardId = "board1";
    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const commits = await axios.get(`http://localhost:3000/api/commits/${boardId}`);
                setCommits(commits.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDatas();
    });
    const graphGenerator = (gitgraph) => {
        let currentBranch = {
            object: gitgraph.branch("main"),
            id: null,
        };
        commits.forEach((commit) => {
            console.log(commit);
            if (currentBranch.id === commit.branch) {
                console.log("matched branch");
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
                width: "105%",
                height: "65vh",
                overflow: "auto",
                borderRight: "1px solid #cecece",
                boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
        >
            {/* <Gitgraph options={{}}>
        {(gitgraph) => {
          graphGenerator(gitgraph);
        }}
      </Gitgraph> */}

            <SampleCommitTree
                currentCommit={currentCommit}
                setCurrentCommit={setCurrentCommit}
                selectedCommit={selectedCommit}
                setSelectedCommit={setSelectedCommit}
            />
        </div>
    );
};
