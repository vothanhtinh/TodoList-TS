import { AxiosResponse } from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Services
import * as inboxServices from "services/inbox";

// Constants

import {
  addInbox,
  changeStatusInbox,
  deleteInbox,
  getInboxs,
  updateInbox,
} from ".";
import {
  ADD_INBOX,
  CHANGE_STATUS_INBOX,
  DELETE_INBOX,
  GET_INBOXS,
  UPDATE_INBOX,
} from "./inboxAction";

function* fetchInboxsSaga() {
  try {
    const response: AxiosResponse = yield call(inboxServices.getInboxs);
    yield put(getInboxs(response.data));
  } catch (error) {
    // Handle error
  }
}

function* createInboxSaga(action: any) {
  try {
    const response: AxiosResponse = yield call(
      inboxServices.createInbox,
      action.payload
    );
    yield put(addInbox(response.data));
  } catch (error) {
    // Handle error
  }
}

function* updateInboxSaga(action: any) {
  try {
    const response: AxiosResponse = yield call(
      inboxServices.updateInbox,
      action.payload
    );
    yield put(updateInbox(response.data));
  } catch (error) {}
}

function* deleteInboxSaga(action: any) {
  try {
    const response: AxiosResponse = yield call(
      inboxServices.deleteInbox,
      action.payload
    );
    yield put(deleteInbox(response.data));
  } catch (error) {}
}

function* changeStatusInboxSaga(action: any) {
  try {
    const response: AxiosResponse = yield call(
      inboxServices.changeStatusInbox,
      action.payload
    );
    yield put(changeStatusInbox(response.data));
  } catch (error) {}
}

function* watchInboxs() {
  yield takeEvery(GET_INBOXS, fetchInboxsSaga);
}

function* watchAddInbox() {
  yield takeLatest(ADD_INBOX, createInboxSaga);
}

function* watchUpdateInbox() {
  yield takeLatest(UPDATE_INBOX, updateInboxSaga);
}

function* watchDeleteInbox() {
  yield takeLatest(DELETE_INBOX, deleteInboxSaga);
}

function* watchChangeStatusInbox() {
  yield takeLatest(CHANGE_STATUS_INBOX, changeStatusInboxSaga);
}

export const inboxSaga = [
  watchInboxs(),
  watchAddInbox(),
  watchUpdateInbox(),
  watchDeleteInbox(),
  watchChangeStatusInbox(),
];
