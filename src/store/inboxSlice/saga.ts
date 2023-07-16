import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { createT, getT, removeT, updateT } from "configs/api";
import {
  ADD_INBOX,
  CHANGE_STATUS_INBOX,
  DELETE_INBOX,
  GET_INBOXS,
  UPDATE_INBOX,
} from "constants/inboxActionType";

function* fetchInboxs() {
  try {
    const response: AxiosResponse = yield call(getT, "/inbox/");
    yield put({ type: "inbox/getInboxs", payload: response.data });
  } catch (error) {
    // Handle error
  }
}

function* createInbox(action: any) {
  try {
    const response: AxiosResponse = yield call(
      createT,
      "/inbox",
      action.payload
    );
    yield put({ type: "inbox/addinbox", payload: response.data });
  } catch (error) {
    // Handle error
  }
}

function* getInboxById(action: any) {
  console.log("id", action.inboxId);
  try {
    const response: AxiosResponse = yield call(
      getT,
      `/inbox/?inboxId=${action.inboxId}`
    );
    return response;
  } catch (error) {
    // Handle error
  }
}

function* updateInbox(action: any) {
  try {
    const getData: AxiosResponse = yield call(getInboxById, action.payload);
    const id = getData.data[0].id;
    const response: AxiosResponse = yield call(
      updateT,
      `/inbox/${id}`,
      action.payload
    );
    yield put({ type: "inbox/updateInbox", payload: response.data });
  } catch (error) {}
}

function* deleteInbox(action: any) {
  try {
    const getData: AxiosResponse = yield call(getInboxById, action.payload);
    const id = getData.data[0].id;
    const response: AxiosResponse = yield call(
      removeT,
      `/inbox/${id}`,
      action.payload
    );
    yield put({ type: "inbox/deleteInbox", payload: response.data });
    console.log(response.data);
  } catch (error) {}
}

function* changeStatusInbox(action: any) {
  try {
    const getData: AxiosResponse = yield call(getInboxById, action.payload);
    const id = getData.data[0].id;
    const response: AxiosResponse = yield call(
      updateT,
      `/inbox/${id}`,
      action.payload
    );
    yield put({ type: "inbox/updateInbox", payload: response.data });
  } catch (error) {}
}
function* watchInboxs() {
  yield takeEvery(GET_INBOXS, fetchInboxs);
}

function* watchAddInbox() {
  yield takeEvery(ADD_INBOX, createInbox);
}

function* watchUpdateInbox() {
  yield takeEvery(UPDATE_INBOX, updateInbox);
}

function* watchDeleteInbox() {
  yield takeEvery(DELETE_INBOX, deleteInbox);
}

function* watchChangeStatusInbox() {
  yield takeEvery(CHANGE_STATUS_INBOX, changeStatusInbox);
}

export const inboxSaga = [
  watchInboxs(),
  watchAddInbox(),
  watchUpdateInbox(),
  watchDeleteInbox(),
  watchChangeStatusInbox(),
];
