import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

// Apis
import { createT, getT, removeT, updateT } from "configs/api";

// Constants
import {
  ADD_TODAY,
  CHANGE_STATUS_TODAY,
  DELETE_TODAY,
  GET_TODAYS,
  TYPE_ADD_TODAY,
  TYPE_DELETE_TODAY,
  TYPE_GET_TODAYS,
  TYPE_UPDATE_TODAY,
  UPDATE_TODAY,
} from "constants/todayActionType";

function* fetchTodays() {
  try {
    const response: AxiosResponse = yield call(getT, "/todo/");
    yield put({ type: TYPE_GET_TODAYS, payload: response.data });
  } catch (error) {
    // Handle error
  }
}

function* createToday(action: any) {
  try {
    const response: AxiosResponse = yield call(
      createT,
      "/todo",
      action.payload
    );
    yield put({ type: TYPE_ADD_TODAY, payload: response.data });
  } catch (error) {
    // Handle error
  }
}

function* getTodayById(action: any) {
  try {
    const response: AxiosResponse = yield call(
      getT,
      `/todo/?todayId=${action.todayId}`
    );
    return response;
  } catch (error) {
    // Handle error
  }
}

function* updateToday(action: any) {
  try {
    const getData: AxiosResponse = yield call(getTodayById, action.payload);
    const id = getData.data[0].id;
    const response: AxiosResponse = yield call(
      updateT,
      `/todo/${id}`,
      action.payload
    );
    yield put({ type: TYPE_UPDATE_TODAY, payload: response.data });
  } catch (error) {}
}

function* deleteToday(action: any) {
  try {
    const getData: AxiosResponse = yield call(getTodayById, action.payload);
    const id = getData.data[0].id;
    const response: AxiosResponse = yield call(
      removeT,
      `/todo/${id}`,
      action.payload
    );
    yield put({ type: TYPE_DELETE_TODAY, payload: response.data });
    console.log(response.data);
  } catch (error) {}
}

function* changeStatusToday(action: any) {
  try {
    const getData: AxiosResponse = yield call(getTodayById, action.payload);
    const id = getData.data[0].id;
    const response: AxiosResponse = yield call(
      updateT,
      `/todo/${id}`,
      action.payload
    );
    yield put({ type: TYPE_UPDATE_TODAY, payload: response.data });
  } catch (error) {}
}
function* watchTodays() {
  yield takeEvery(GET_TODAYS, fetchTodays);
}

function* watchAddToday() {
  yield takeEvery(ADD_TODAY, createToday);
}

function* watchUpdateToday() {
  yield takeEvery(UPDATE_TODAY, updateToday);
}

function* watchDeleteToday() {
  yield takeEvery(DELETE_TODAY, deleteToday);
}

function* watchChangeStatusToday() {
  yield takeEvery(CHANGE_STATUS_TODAY, changeStatusToday);
}

export const todaySaga = [
  watchTodays(),
  watchAddToday(),
  watchUpdateToday(),
  watchDeleteToday(),
  watchChangeStatusToday(),
];
