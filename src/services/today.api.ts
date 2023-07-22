import { TodayType } from "types/today.type";
import { create, remove, get, update, updateMany } from "./http";

const pathUrl = "/today/";

export const getToday = () => {
  const results = get<Array<TodayType>>(pathUrl);
  return results;
};

export const createToday = async (data: Partial<TodayType>) => {
  try {
    const results = await create(pathUrl, data);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateToday = async (data: TodayType) => {
  try {
    const results = await update(`${pathUrl}${data._id}`, data);
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteToday = async (data: Partial<TodayType>) => {
  try {
    const results = await remove(`${pathUrl}${data._id}`);

    return results;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodays = async (data: TodayType[]) => {
  const results = await updateMany(`${pathUrl}`, data);

  return results.data;
};
