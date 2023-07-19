//Libraries
import { AxiosResponse } from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Constants
import {
  ADD_TODAY,
  CHANGE_STATUS_TODAY,
  DELETE_TODAY,
  GET_TODAYS,
  UPDATE_TODAY,
  UPDATE_TODAYS,
} from "store/todaySlice/todayAction";
import {
  addToday,
  changeStatusToday,
  deleteToday,
  getTodays,
  updateToday,
  updateTodays,
} from ".";

// Services
import * as todayServices from "services/today";

function* fetchTodaysSaga() {
  try {
    const response: AxiosResponse = yield call(todayServices.getToday);
    yield put(getTodays(response.data));
  } catch (error) {
    // Handle error
  }
}

function* createTodaySaga(action: any) {
  try {
    const response: AxiosResponse = yield call(
      todayServices.createToday,
      action.payload
    );
    yield put(addToday(response.data));
  } catch (error) {
    // Handle error
  }
}

function* updateTodaySaga(action: any) {
  try {
    const response: AxiosResponse = yield call(
      todayServices.updateToday,
      action.payload
    );
    yield put(updateToday(response.data));
  } catch (error) {}
}

function* updateTodaysSaga(action: any) {
  console.log(action);
  try {
    yield call(todayServices.updateTodays, action.payload);
    yield put(getTodays(action.payload));
    // yield put(updateToday(response.data));
  } catch (error) {}
}

function* deleteTodaySaga(action: any) {
  try {
    const response: AxiosResponse = yield call(
      todayServices.deleteToday,
      action.payload
    );
    yield put(deleteToday(response.data));
  } catch (error) {}
}

function* changeStatusTodaySaga(action: any) {
  try {
    const response: AxiosResponse = yield call(
      todayServices.changeStatusToday,
      action.payload
    );
    yield put(changeStatusToday(response.data));
  } catch (error) {}
}

function* watchTodays() {
  yield takeEvery(GET_TODAYS, fetchTodaysSaga);
}

function* watchAddToday() {
  yield takeLatest(ADD_TODAY, createTodaySaga);
}

function* watchUpdateToday() {
  yield takeEvery(UPDATE_TODAY, updateTodaySaga);
}

function* watchDeleteToday() {
  yield takeLatest(DELETE_TODAY, deleteTodaySaga);
}

function* watchChangeStatusToday() {
  yield takeLatest(CHANGE_STATUS_TODAY, changeStatusTodaySaga);
}
function* watchUpdateTodays() {
  yield takeLatest(updateTodays, updateTodaysSaga);
}

export const todaySaga = [
  watchTodays(),
  watchAddToday(),
  watchUpdateToday(),
  watchDeleteToday(),
  watchChangeStatusToday(),
  watchUpdateTodays(),
];
