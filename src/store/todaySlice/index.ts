import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodayType } from "types/today.type";

interface TodayState {
  todays: TodayType[];
  isLoading: boolean;
}

const initialState: TodayState = {
  todays: [],
  isLoading: false,
};

const todaySlice = createSlice({
  name: "today",
  initialState,
  reducers: {
    getTodays: (state, action: PayloadAction<TodayType[]>) => {
      state.todays = action.payload?.sort((a, b) => a.order - b.order);
      state.isLoading = true;
    },
    updateTodays: (state, action: PayloadAction<TodayType[]>) => {
      state.todays = action.payload;
    },
    addToday: (state, action: PayloadAction<TodayType>) => {
      state.todays.push(action.payload);
    },
    updateToday: (state, action: PayloadAction<TodayType>) => {
      const { _id } = action.payload;
      const index = state.todays.findIndex((today) => today._id === _id);

      if (index !== -1) {
        state.todays[index] = action.payload;
      }
    },
    changeStatusToday: (state, action: PayloadAction<TodayType>) => {
      const { todayId } = action.payload;
      const index = state.todays.findIndex(
        (today) => today.todayId === todayId
      );

      if (index !== -1) {
        state.todays[index].status = 1;
      }
    },
    deleteToday: (state, action: PayloadAction<Partial<TodayType>>) => {
      console.log(action.payload, "delete");
      const { todayId } = action.payload;

      state.todays = state.todays.filter((today) => today.todayId !== todayId);
    },
  },
});

export const {
  getTodays,
  addToday,
  updateToday,
  deleteToday,
  changeStatusToday,
  updateTodays,
} = todaySlice.actions;

export default todaySlice.reducer;
