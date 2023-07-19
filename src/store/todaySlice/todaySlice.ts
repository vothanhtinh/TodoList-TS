import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/configStore";

const selectSlice = (state: RootState) => state.todayReducer;

export const selectTodays = createSelector(
  [selectSlice],
  (state) => state.todays
);

export const selectIsLoadingToday = createSelector(
  [selectSlice],
  (state) => state.isLoading
);
