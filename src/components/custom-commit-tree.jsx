'use client';
import React, {useState, useEffect} from 'react';
import { Gitgraph } from '@gitgraph/react';
import { CommitGraph } from 'commit-graph';

export const CustomCommitTree = () => {
    const [commits, setCommits] = useState([]);
    const [branches, setBranches] = useState([]);



    return (
      <div
        style={{
          width: "50%",
        }}>
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
}

