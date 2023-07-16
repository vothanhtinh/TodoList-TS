// Action Types
const GET_INBOXS = "getInboxs";
const ADD_INBOX = "addInbox";
const UPDATE_INBOX = "updateInbox";
const DELETE_INBOX = "deleteInbox";
const CHANGE_STATUS_INBOX = "changeStatusInbox";

// Types
const TYPE_GET_INBOXS = "inbox/getInboxs";
const TYPE_ADD_INBOX = "inbox/addInbox";
const TYPE_UPDATE_INBOX = "inbox/updateInbox";
const TYPE_DELETE_INBOX = "inbox/deleteInbox";
const TYPE_CHANGE_STATUS_INBOX = "inbox/changeStatusInbox";

export interface Inbox {
  inboxId: string;
  title: string;
  description: string;
  status: number;
}

export interface InboxAction {
  payload: Inbox;
}
// Action Creators
const getInboxs = () => ({ type: GET_INBOXS });
const addInbox = (newInbox: Inbox) => ({
  type: ADD_INBOX,
  payload: newInbox,
});
const updateInbox = (updateInbox: Inbox) => ({
  type: UPDATE_INBOX,
  payload: updateInbox,
});
const deleteInbox = (deleteInbox: Inbox) => ({
  type: DELETE_INBOX,
  payload: deleteInbox,
});
const changeStatusInbox = (updateInbox: Inbox) => ({
  type: CHANGE_STATUS_INBOX,
  payload: updateInbox,
});

export {
  GET_INBOXS,
  ADD_INBOX,
  DELETE_INBOX,
  UPDATE_INBOX,
  CHANGE_STATUS_INBOX,
  TYPE_GET_INBOXS,
  TYPE_ADD_INBOX,
  TYPE_DELETE_INBOX,
  TYPE_UPDATE_INBOX,
  TYPE_CHANGE_STATUS_INBOX,
  getInboxs,
  addInbox,
  updateInbox,
  deleteInbox,
  changeStatusInbox,
};
