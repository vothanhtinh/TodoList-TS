import { PayloadAction } from "@reduxjs/toolkit";

// Action Types
const GET_INBOXS = "getInboxs";
const ADD_INBOX = "addInbox";
const UPDATE_INBOX = "updateInbox";
const DELETE_INBOX = "deleteInbox";
const CHANGE_STATUS_INBOX = "changeStatusInbox";

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
const getInboxs = () => ({ type: GET_INBOXS });
const addInbox = (newInbox: Partial<Inbox>) => ({
  type: ADD_INBOX,
  payload: newInbox,
});
const updateInbox = (updateInbox: Partial<Inbox>) => ({
  type: UPDATE_INBOX,
  payload: updateInbox,
});
const deleteInbox = (deleteInbox: Partial<Inbox>) => ({
  type: DELETE_INBOX,
  payload: deleteInbox,
});
const changeStatusInbox = (updateInbox: Partial<Inbox>) => ({
  type: CHANGE_STATUS_INBOX,
  payload: updateInbox,
});

export {
  GET_INBOXS,
  ADD_INBOX,
  DELETE_INBOX,
  UPDATE_INBOX,
  CHANGE_STATUS_INBOX,
  getInboxs,
  addInbox,
  updateInbox,
  deleteInbox,
  changeStatusInbox,
};
