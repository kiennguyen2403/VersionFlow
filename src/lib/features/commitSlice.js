import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    id: "",
    boardId: "",
    branch: "",
    previousCommitId: "",
    message: "",
    date: "",
    action: "",
    content: [],
}

export const commitSlice = createSlice({
    name: "commit",
    initialState,
    reducers: {
        setCommitState: (state, action) => {
            state.id = action.payload.id;
            state.boardId = action.payload.boardId;
            state.branch = action.payload.branch;
            state.previousCommitId = action.payload.previousCommitId;
            state.message = action.payload.message;
            state.date = action.payload.date;
            state.action = action.payload.action;
            state.content = action.payload.content;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setCommitState } = commitSlice.actions;
export const selectCommitState = (state) => state.commit.commitState;
export default commitSlice.reducer;