// Delete this file when completing backend mock data

import { graphOptions } from "./graph-options";
import { Gitgraph } from "@gitgraph/react";

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
                setSelectedCommit(commit);
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
