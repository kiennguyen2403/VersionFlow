'use client';
import React, {useState, useEffect} from 'react';
import { CommitGraph } from 'commit-graph';


const commitsData = [
  {
    hash: "commit-hash",
    ownerName: "repository-owner",
    repoName: "repository-name",
    committer: {
      displayName: "committer-displayName",
    },
    message: "commit-message",
    parents: ["parent-commit-hash-1", "parent-commit-hash-2"],
    committedAt: new Date(),
    commitLink:
      "https://github.com/repository-owner/repository-name/main/commit-hash",
  },
  {
    hash: "commit-hash",
    ownerName: "repository-owner",
    repoName: "repository-name",
    committer: {
      displayName: "committer-displayName",
    },
    message: "commit-message",
    parents: ["parent-commit-hash-1", "parent-commit-hash-2"],
    committedAt: new Date(),
    commitLink:
      "https://github.com/repository-owner/repository-name/main/commit-hash",
  },
];

const branchesHeads = [{
    branchName: "branch-name-1",
    headCommitHash: "commit-hash-1",
  },
  {
    branchName: "branch-name-2",
    headCommitHash: "commit-hash-2",
    branchLink: "https://github.com/repository-owner/repository-name/main",
}];


export const CustomCommitTree = () => {
    const [commits, setCommits] = useState([]);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        setCommits(commitsData);
        setBranches(branchesHeads); 
    }, []);

    return (
      <div style={{
        margin: "auto",
      }}>
        <CommitGraph
          commits={commits}
          branchHeads={branches}
          graphStyle={{
            commitSpacing: 50,
            branchSpacing: 20,
            branchColors: ["#FF0000", "#00FF00", "#0000FF"],
            nodeRadius: 2,
          }}
        />
      </div>
    );
}

