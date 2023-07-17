import { AxiosResponse } from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Apis
import { createT, getT, removeT, updateT } from "configs/api";

// Constants
import {
  ADD_TODAY,
  CHANGE_STATUS_TODAY,
  DELETE_TODAY,
  GET_TODAYS,
  UPDATE_TODAY,
} from "store/todaySlice/todayAction";
import {
  addToday,
  changeStatusToday,
  deleteToday,
  getTodays,
  updateToday,
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
    console.log(response.data, "test");
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
  yield takeLatest(UPDATE_TODAY, updateTodaySaga);
}

function* watchDeleteToday() {
  yield takeLatest(DELETE_TODAY, deleteTodaySaga);
}

function* watchChangeStatusToday() {
  yield takeLatest(CHANGE_STATUS_TODAY, changeStatusTodaySaga);
}

export const todaySaga = [
  watchTodays(),
  watchAddToday(),
  watchUpdateToday(),
  watchDeleteToday(),
  watchChangeStatusToday(),
];
