import { create, remove, get, update } from "./api";

const pathUrl = "/inbox/";

type TCreateInboxData = {
  id?: string;
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
    const results = await update(`${pathUrl}${data.id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInbox = async (data: TCreateInboxData) => {
  try {
    const results = await remove(`${pathUrl}${data.id}`);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const changeStatusInbox = async (data: TCreateInboxData) => {
  try {
    const results = await update(`${pathUrl}${data.id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateInboxs = async (data: TCreateInboxData[]) => {
  const results = data.map(async (inbox) => {
    await updateInbox(inbox);
  });
  return Promise.all(results);
};
