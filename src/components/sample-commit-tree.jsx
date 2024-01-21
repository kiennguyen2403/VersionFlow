// Delete this file when completing backend mock data

import { graphOptions } from "./graph-options";
import { Gitgraph } from "@gitgraph/react";


const mockData = {
  commits: [
    {
      _id: "65ab6bd53fe0a5984ca54022",
      id: "commit1",
      boardId: "board1",
      branch: "main",
      previousCommitId: null,
      message: "Initial commit",
      date: "2023-01-20T10:30:00.000Z",
      action: "create",
      content: ["file1.txt", "file2.txt"],
    },
    {
      _id: "65ab6bd53fe0a5984ca54023",
      id: "commit2",
      boardId: "board1",
      branch: "main",
      previousCommitId: "commit1",
      message: "Add feature",
      date: "2023-01-21T11:45:00.000Z",
      action: "update",
      content: ["feature-file1.txt", "feature-file2.txt"],
    },
    {
      _id: "65ab6bd53fe0a5984ca54024",
      id: "commit3",
      boardId: "board1",
      branch: "main",
      previousCommitId: "commit2",
      message: "Fix bug",
      date: "2023-01-22T09:15:00.000Z",
      action: "update",
      content: ["bugfix-file1.txt", "bugfix-file2.txt"],
    },
    {
      _id: "65ab6bd53fe0a5984ca54025",
      id: "commit4",
      boardId: "board1",
      branch: "main",
      previousCommitId: "commit3",
      message: "Merge feature-branch into main",
      date: "2023-01-23T14:00:00.000Z",
      action: "merge",
      content: ["merged-file1.txt", "merged-file2.txt"],
    },
    {
      _id: "65ab6bd53fe0a5984ca54026",
      id: "commit5",
      boardId: "board1",
      branch: "feature-branch",
      previousCommitId: "commit4",
      message: "Start working on new feature",
      date: "2023-01-25T09:30:00.000Z",
      action: "checkout",
      content: ["feature-file1.txt", "feature-file2.txt"],
    },
    {
      _id: "65ab6bd53fe0a5984ca54027",
      id: "commit6",
      boardId: "board1",
      branch: "feature-branch",
      previousCommitId: "commit5",
      message: "Continue developing new feature",
      date: "2023-01-26T14:45:00.000Z",
      action: "update",
      content: ["feature-file3.txt", "feature-file4.txt"],
    },
    {
      _id: "65ab6bd53fe0a5984ca54028",
      id: "commit7",
      boardId: "board1",
      branch: "feature-branch",
      previousCommitId: "commit6",
      message: "Finish implementing new feature",
      date: "2023-01-27T11:00:00.000Z",
      action: "update",
      content: ["feature-file5.txt", "feature-file6.txt"],
    },
    {
      _id: "65ab6bd53fe0a5984ca54029",
      id: "commit8",
      boardId: "board1",
      branch: "main",
      previousCommitId: "commit7",
      message: "Merge feature-branch into main",
      date: "2023-01-28T15:30:00.000Z",
      action: "merge",
      content: [
        "merged-file3.txt",
        "merged-file4.txt",
        "merged-file5.txt",
        "merged-file6.txt",
      ],
    },
  ],
};

export function SampleCommitTree({
    currentCommit,
    setCurrentCommit,
    selectedCommit,
    setSelectedCommit,
    setValue,
}) {
    function messageWithClick(message) {
        const param = {
            subject: message,
            onClick(commit) {
                // setSelectedCommit(commit);
                setValue(0);
            },
        };
        return param;
    }

    return (
        <Gitgraph options={graphOptions}>
            {(gitgraph) => {
                // Simulate git commands with Gitgraph API.
                const master = gitgraph.branch("master");
                master.commit({
                    ...messageWithClick("Initial commit"),
                    style: { dot: { color: "red" } }, // TODO: Check with current commit
                });

                const develop = master.branch("develop");
                develop.commit(messageWithClick("Add TypeScript"));

                const aFeature = develop.branch("a-feature");
                aFeature
                    .commit(messageWithClick("Make it work"))
                    .commit(messageWithClick("Make it right"))
                    .commit(messageWithClick("Make it fast"));

                develop.merge(aFeature);
                develop.commit(messageWithClick("Prepare v1"));

                master.merge(develop);
            }}
        </Gitgraph>
    );
}
