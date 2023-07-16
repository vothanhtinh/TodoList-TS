// Libaries
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

// Apis
import { createT, getT, removeT, updateT } from "configs/api";

// Constants
import {
  ADD_INBOX,
  CHANGE_STATUS_INBOX,
  DELETE_INBOX,
  GET_INBOXS,
  TYPE_ADD_INBOX,
  TYPE_CHANGE_STATUS_INBOX,
  TYPE_DELETE_INBOX,
  TYPE_GET_INBOXS,
  TYPE_UPDATE_INBOX,
  UPDATE_INBOX,
} from "constants/inboxActionType";

function* fetchInboxs() {
  try {
    const response: AxiosResponse = yield call(getT, "/inbox/");
    yield put({ type: TYPE_GET_INBOXS, payload: response.data });
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
    yield put({ type: TYPE_ADD_INBOX, payload: response.data });
  } catch (error) {
    // Handle error
  }
}

function* getInboxById(action: any) {
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
    yield put({ type: TYPE_UPDATE_INBOX, payload: response.data });
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
    yield put({ type: TYPE_DELETE_INBOX, payload: response.data });
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
    yield put({ type: TYPE_CHANGE_STATUS_INBOX, payload: response.data });
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
