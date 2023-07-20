import { create, remove, get, update, updateMany } from "./api";

const pathUrl = "/inbox/";

type TCreateInboxData = {
  _id?: string;
  inboxId: string;
  title: string;
  description: string;
  status: number;
};

export const getInboxs = async () => {
  try {
    const results = await get(pathUrl);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const createInbox = async (data: Partial<TCreateInboxData>) => {
  try {
    const results = await create(pathUrl, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateInbox = async (data: TCreateInboxData) => {
  try {
    const results = await update(`${pathUrl}${data._id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInbox = async (data: TCreateInboxData) => {
  console.log(data, "data");

  try {
    const results = await remove(`${pathUrl}${data._id}`);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const changeStatusInbox = async (data: TCreateInboxData) => {
  try {
    const results = await update(`${pathUrl}${data._id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateInboxs = async (data: TCreateInboxData[]) => {
  try {
    const results = await updateMany(`${pathUrl}`, data);
    return results;
  } catch (error) {
    return error;
  }
};
