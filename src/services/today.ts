import { create, remove, get, update, updateMany } from "./api";

const pathUrl = "/today/";

type TCreateTodayData = {
  _id?: string;
  todayId: string;
  title: string;
  description: string;
  status: number;
};

export const getToday = async () => {
  try {
    const results = await get(pathUrl);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const createToday = async (data: Partial<TCreateTodayData>) => {
  try {
    const results = await create(pathUrl, data);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateToday = async (data: TCreateTodayData) => {
  try {
    const results = await update(`${pathUrl}${data._id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteToday = async (data: TCreateTodayData) => {
  try {
    const results = await remove(`${pathUrl}${data._id}`);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const changeStatusToday = async (data: TCreateTodayData) => {
  try {
    const results = await update(`${pathUrl}${data._id}`, data);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodays = async (data: TCreateTodayData[]) => {
  const results = await updateMany(`${pathUrl}`, data);

  return results.data;
};
