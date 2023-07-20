import { PayloadAction } from "@reduxjs/toolkit";

// Action Types
const GET_INBOXS = "GET_INBOXS";
const ADD_INBOX = "ADD_INBOX";
const UPDATE_INBOX = "UPDATE_INBOX";
const DELETE_INBOX = "DELETE_INBOX";
const CHANGE_STATUS_INBOX = "CHANGE_STATUS_INBOX";
const UPDATE_INBOXS = "UPDATE_INBOXS";

export interface Inbox {
  id?: string;
  inboxId: string;
  title: string;
  description: string;
  status: number;
}

export interface InboxAction {
  payload?: PayloadAction;
}

// Action Creators
const getInboxsSaga = () => ({ type: GET_INBOXS });
const addInboxSaga = (newInbox: Partial<Inbox>) => ({
  type: ADD_INBOX,
  payload: newInbox,
});
const updateInboxSaga = (updateInbox: Partial<Inbox>) => ({
  type: UPDATE_INBOX,
  payload: updateInbox,
});
const deleteInboxSaga = (deleteInbox: Partial<Inbox>) => ({
  type: DELETE_INBOX,
  payload: deleteInbox,
});
const changeStatusInboxSaga = (updateInbox: Partial<Inbox>) => ({
  type: CHANGE_STATUS_INBOX,
  payload: updateInbox,
});
const updateInboxsSaga = (updateInboxs: Partial<Inbox[]>) => ({
  type: UPDATE_INBOXS,
  payload: updateInboxs,
});
export {
  GET_INBOXS,
  ADD_INBOX,
  DELETE_INBOX,
  UPDATE_INBOX,
  CHANGE_STATUS_INBOX,
  UPDATE_INBOXS,
  getInboxsSaga,
  addInboxSaga,
  updateInboxSaga,
  deleteInboxSaga,
  changeStatusInboxSaga,
  updateInboxsSaga,
};
