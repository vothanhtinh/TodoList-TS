import { createTodo, deleteTodo, getTodo, updateTodo } from "./api";

const pathUrl = "/todo/";

type TCreateTodayData = {
  id?: string;
  todayId: string;
  title: string;
  description: string;
  status: number;
};

export const getToday = async () => {
  try {
    const results = await getTodo(pathUrl);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const createToday = async (data: Partial<TCreateTodayData>) => {
  try {
    const results = await createTodo(pathUrl, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateToday = async (data: TCreateTodayData) => {
  try {
    const results = await updateTodo(`${pathUrl}${data.id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteToday = async (data: TCreateTodayData) => {
  try {
    const results = await deleteTodo(`${pathUrl}${data.id}`);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const changeStatusToday = async (data: TCreateTodayData) => {
  try {
    const results = await updateTodo(`${pathUrl}${data.id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};
