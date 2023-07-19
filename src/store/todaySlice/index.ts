import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Today {
  id?: string;
  todayId: string;
  description: string;
  title: string;
  status: number;
  order: number;
}

interface TodayState {
  todays: Today[];
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
    getTodays: (state, action: PayloadAction<Today[]>) => {
      state.todays = action.payload?.sort((a, b) => a.order - b.order);
      state.isLoading = true;
    },
    updateTodays: (state, action: PayloadAction<Today[]>) => {
      state.todays = action.payload;
    },
    addToday: (state, action: PayloadAction<Today>) => {
      state.todays.push(action.payload);
    },
    updateToday: (state, action: PayloadAction<Today>) => {
      const { todayId } = action.payload;
      const index = state.todays.findIndex(
        (today) => today.todayId === todayId
      );

      if (index !== -1) {
        state.todays[index] = action.payload;
      }
    },
    changeStatusToday: (state, action: PayloadAction<Today>) => {
      const { todayId } = action.payload;
      const index = state.todays.findIndex(
        (today) => today.todayId === todayId
      );

      if (index !== -1) {
        state.todays[index].status = 1;
      }
    },
    deleteToday: (state, action: PayloadAction<Partial<Today>>) => {
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
