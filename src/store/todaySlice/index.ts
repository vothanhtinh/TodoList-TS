import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Today {
  todayId: string;
  description: string;
  title: string;
  status: number;
}

interface TodayState {
  todays: Today[];
}

const initialState: TodayState = {
  todays: [],
};

const todaySlice = createSlice({
  name: "today",
  initialState,
  reducers: {
    getTodays: (state, action: PayloadAction<Today[]>) => {
      state.todays = action.payload;
    },
    addToday: (state, action: PayloadAction<Today>) => {
      state.todays.push(action.payload);
    },
    updateToday: (state, action: PayloadAction<Today>) => {
      console.log("test");
      const { todayId, title, description, status } = action.payload;
      const index = state.todays.findIndex(
        (today) => today.todayId === todayId
      );
      if (index !== -1) {
        state.todays[index] = { todayId, title, description, status };
      }
    },

    changeStatusToday: (state, action: PayloadAction<Today>) => {
      const { todayId, title, description } = action.payload;
      const index = state.todays.findIndex(
        (today) => today.todayId === todayId
      );
      if (index !== -1) {
        state.todays[index] = { todayId, title, description, status: 1 };
      }
    },

    deleteToday: (state, action: PayloadAction<Today>) => {
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
} = todaySlice.actions;
export default todaySlice.reducer;
