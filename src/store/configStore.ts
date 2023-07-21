import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

//reducer
import inboxSlice from "./inboxSlice/index";
import todaySlice from "./todaySlice";

// Định nghĩa RootState để sử dụng trong useSelector
export type RootState = ReturnType<typeof store.getState>;

// Định nghĩa useDispatch và useSelector với kiểu RootState
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Khởi tạo Redux store
export const store = configureStore({
  reducer: {
    inboxReducer: inboxSlice,
    todayReducer: todaySlice,
  },
});
