import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Inbox {
  inboxId: string;
  description: string;
  title: string;
  status: number;
}

interface InboxState {
  inboxs: Inbox[];
}

const initialState: InboxState = {
  inboxs: [],
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    getInboxs: (state, action: PayloadAction<Inbox[]>) => {
      state.inboxs = action.payload;
    },
    addInbox: (state, action: PayloadAction<Inbox>) => {
      state.inboxs.push(action.payload);
    },
    updateInbox: (state, action: PayloadAction<Inbox>) => {
      const { inboxId, title, description, status } = action.payload;
      const index = state.inboxs.findIndex(
        (inbox) => inbox.inboxId === inboxId
      );
      if (index !== -1) {
        state.inboxs[index] = { inboxId, title, description, status };
      }
    },

    changeStatusInbox: (state, action: PayloadAction<Inbox>) => {
      const { inboxId, title, description } = action.payload;
      const index = state.inboxs.findIndex(
        (inbox) => inbox.inboxId === inboxId
      );
      if (index !== -1) {
        state.inboxs[index] = { inboxId, title, description, status: 1 };
      }
    },

    deleteInbox: (state, action: PayloadAction<Inbox>) => {
      const { inboxId } = action.payload;
      state.inboxs = state.inboxs.filter((inbox) => inbox.inboxId !== inboxId);
    },
  },
});

export const {
  getInboxs,
  addInbox,
  updateInbox,
  deleteInbox,
  changeStatusInbox,
} = inboxSlice.actions;
export default inboxSlice.reducer;
