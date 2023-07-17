import { createTodo, deleteTodo, getTodo, updateTodo } from "./api";

const pathUrl = "/todo/";

type TCreateInboxData = {
  id?: string;
  inboxId: string;
  title: string;
  description: string;
  status: number;
};

export const getInboxs = async () => {
  try {
    const results = await getTodo(pathUrl);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const createInbox = async (data: Partial<TCreateInboxData>) => {
  try {
    const results = await createTodo(pathUrl, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateInbox = async (data: TCreateInboxData) => {
  try {
    const results = await updateTodo(`${pathUrl}${data.id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInbox = async (data: TCreateInboxData) => {
  try {
    const results = await deleteTodo(`${pathUrl}${data.id}`);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const changeStatusInbox = async (data: TCreateInboxData) => {
  try {
    const results = await updateTodo(`${pathUrl}${data.id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};
