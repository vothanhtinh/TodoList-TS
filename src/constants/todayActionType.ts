// Action Types
export const GET_TODAYS = "getTodays";
export const ADD_TODAY = "addToday";
export const UPDATE_TODAY = "updateToday";
export const DELETE_TODAY = "deleteToday";
export const CHANGE_STATUS_TODAY = "changeStatusToday";

interface Today {
  todayId: string;
  title: string;
  description: string;
  status: number;
}
// Action Creators
export const getTodays = () => ({ type: GET_TODAYS });
export const addToday = (newToday: Today) => ({
  type: ADD_TODAY,
  payload: newToday,
});
export const updateToday = (updatedToday: Today) => ({
  type: UPDATE_TODAY,
  payload: updatedToday,
});
export const deleteToday = (deleteToday: Today) => ({
  type: DELETE_TODAY,
  payload: deleteToday,
});
export const changeStatusToday = (updatedToday: Today) => ({
  type: CHANGE_STATUS_TODAY,
  payload: updatedToday,
});
