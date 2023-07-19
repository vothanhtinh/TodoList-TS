// Action Types
const GET_TODAYS = "GET_TODAYS";
const ADD_TODAY = "ADD_TODAY";
const UPDATE_TODAY = "UPDATE_TODAY";
const DELETE_TODAY = "DELETE_TODAY";
const CHANGE_STATUS_TODAY = "CHANGE_STATUS_TODAY";
const UPDATE_TODAYS = "UPDATE_TODAYS";

interface Today {
  id?: string;
  todayId: string;
  title: string;
  description: string;
  status: number;
}
// Action Creators
const getTodaysSaga = () => ({ type: GET_TODAYS });
const addTodaySaga = (newToday: Partial<Today>) => ({
  type: ADD_TODAY,
  payload: newToday,
});
const updateTodaySaga = (updatedToday: Partial<Today>) => ({
  type: UPDATE_TODAY,
  payload: updatedToday,
});
const deleteTodaySaga = (deleteToday: Partial<Today>) => ({
  type: DELETE_TODAY,
  payload: deleteToday,
});
const changeStatusTodaySaga = (updatedToday: Partial<Today>) => ({
  type: CHANGE_STATUS_TODAY,
  payload: updatedToday,
});
const updateTodaysSaga = (updatedTodays: Partial<Today[]>) => ({
  type: UPDATE_TODAYS,
  payload: updatedTodays,
});

export {
  GET_TODAYS,
  UPDATE_TODAY,
  CHANGE_STATUS_TODAY,
  DELETE_TODAY,
  ADD_TODAY,
  UPDATE_TODAYS,
  getTodaysSaga,
  updateTodaySaga,
  deleteTodaySaga,
  changeStatusTodaySaga,
  addTodaySaga,
  updateTodaysSaga,
};
