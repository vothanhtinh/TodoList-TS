import { InboxType } from "types/inbox.type";
import { create, remove, get, update, updateMany } from "./http";

const pathUrl = "/inbox/";

export const getInbox = () => {
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
