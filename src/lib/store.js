import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { commitSlice } from "./features/commitSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      commit: commitSlice.reducer,
    },
  });
}

export const wrapper = createWrapper(makeStore, { debug: true });