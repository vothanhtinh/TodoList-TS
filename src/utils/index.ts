import { AnyAction } from "@reduxjs/toolkit";
import { InboxType } from "types/inbox.type";
import { TodayType } from "types/today.type";

export const swapIndexInbox = (
  arr: InboxType[],
  startIndex: number,
  lastIndex: number
) => {
  const newArr = [...arr];

  // Phần tử được kéo
  const [removed] = newArr.splice(startIndex, 1);

  // Chèn phần tử được kéo vào vị trí mới
  newArr.splice(lastIndex, 0, removed);
  return newArr.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};

export const swapIndexToday = (
  arr: TodayType[],
  startIndex: number,
  lastIndex: number
) => {
  const newArr = [...arr];

  // Phần tử được kéo
  const [removed] = newArr.splice(startIndex, 1);

  // Chèn phần tử được kéo vào vị trí mới
  newArr.splice(lastIndex, 0, removed);
  return newArr.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};

export const swapIndex = (arr: any, startIndex: number, lastIndex: number) => {
  const newArr = [...arr];

  // Phần tử được kéo
  const [removed] = newArr.splice(startIndex, 1);

  // Chèn phần tử được kéo vào vị trí mới
  newArr.splice(lastIndex, 0, removed);
  return newArr.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};
