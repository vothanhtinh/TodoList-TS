// Action Types
const GET_TODAYS = "getTodays";
const ADD_TODAY = "addToday";
const UPDATE_TODAY = "updateToday";
const DELETE_TODAY = "deleteToday";
const CHANGE_STATUS_TODAY = "changeStatusToday";

const TYPE_GET_TODAYS = "today/getTodays";
const TYPE_ADD_TODAY = "today/addToday";
const TYPE_UPDATE_TODAY = "today/updateToday";
const TYPE_DELETE_TODAY = "today/deleteToday";

interface Today {
  todayId: string;
  title: string;
  description: string;
  status: number;
}
// Action Creators
const getTodays = () => ({ type: GET_TODAYS });
const addToday = (newToday: Today) => ({
  type: ADD_TODAY,
  payload: newToday,
});
const updateToday = (updatedToday: Today) => ({
  type: UPDATE_TODAY,
  payload: updatedToday,
});
const deleteToday = (deleteToday: Today) => ({
  type: DELETE_TODAY,
  payload: deleteToday,
});
const changeStatusToday = (updatedToday: Today) => ({
  type: CHANGE_STATUS_TODAY,
  payload: updatedToday,
});

export {
  GET_TODAYS,
  UPDATE_TODAY,
  CHANGE_STATUS_TODAY,
  DELETE_TODAY,
  ADD_TODAY,
  TYPE_ADD_TODAY,
  TYPE_DELETE_TODAY,
  TYPE_GET_TODAYS,
  TYPE_UPDATE_TODAY,
  getTodays,
  updateToday,
  deleteToday,
  changeStatusToday,
  addToday,
};
