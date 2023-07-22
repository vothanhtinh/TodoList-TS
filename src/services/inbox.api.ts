import { InboxType } from "types/inbox.type";
import { create, remove, get, update, updateMany } from "./http";

const pathUrl = "/inbox/";

export const getInboxs = () => {
  return get<Array<InboxType>>(pathUrl);
};

export const createInbox = async (data: Partial<InboxType>) => {
  try {
    const results = await create(pathUrl, data);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateInbox = async (data: Partial<InboxType>) => {
  try {
    const results = await update(`${pathUrl}${data._id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInbox = async (data: Partial<InboxType>) => {
  console.log(data, "data");

  try {
    const results = await remove(`${pathUrl}${data._id}`);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const changeStatusInbox = async (data: Partial<InboxType>) => {
  try {
    const results = await update(`${pathUrl}${data._id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateInboxs = async (data: InboxType[]) => {
  try {
    const results = await updateMany(`${pathUrl}`, data);
    return results;
  } catch (error) {
    return error;
  }
};
