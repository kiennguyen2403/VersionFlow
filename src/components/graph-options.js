import { templateExtend } from "@gitgraph/react";

export const graphOptions = {
    template: templateExtend("metro", {
        // colors: ["red", "blue", "orange"],
        branch: {
            lineWidth: 4,
            spacing: 40,
            label: {
                font: "arial",
            },
            mergeStyle: "straight",
        },
        commit: {
            message: {
                displayAuthor: false,
                displayHash: false,
            },
            dot: {
                size: 10,
            },
            spacing: 30,
        },
        
    }),
    mode: "compact",
};
