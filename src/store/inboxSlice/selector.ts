import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/configStore";

const selectSlice = (state: RootState) => state.inboxReducer;

export const selectInboxs = createSelector(
  [selectSlice],
  (state) => state.inboxs
);

export const selectIsLoadingInbox = createSelector(
  [selectSlice],
  (state) => state.isLoading
);
