// Action Types
const GET_TODAYS = "getTodays";
const ADD_TODAY = "addToday";
const UPDATE_TODAY = "updateToday";
const DELETE_TODAY = "deleteToday";
const CHANGE_STATUS_TODAY = "changeStatusToday";

interface Today {
  id?: string;
  todayId: string;
  title: string;
  description: string;
  status: number;
}
// Action Creators
const getTodays = () => ({ type: GET_TODAYS });
const addToday = (newToday: Partial<Today>) => ({
  type: ADD_TODAY,
  payload: newToday,
});
const updateToday = (updatedToday: Partial<Today>) => ({
  type: UPDATE_TODAY,
  payload: updatedToday,
});
const deleteToday = (deleteToday: Partial<Today>) => ({
  type: DELETE_TODAY,
  payload: deleteToday,
});
const changeStatusToday = (updatedToday: Partial<Today>) => ({
  type: CHANGE_STATUS_TODAY,
  payload: updatedToday,
});

export {
  GET_TODAYS,
  UPDATE_TODAY,
  CHANGE_STATUS_TODAY,
  DELETE_TODAY,
  ADD_TODAY,
  getTodays,
  updateToday,
  deleteToday,
  changeStatusToday,
  addToday,
};
