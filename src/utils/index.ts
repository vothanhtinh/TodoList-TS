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
  // const newArr = [...arr];

  // const startIndexInArr = newArr.findIndex((item) => item.order === startIndex);
  // const lastIndexInArr = newArr.findIndex((item) => item.order === lastIndex);
  // if (startIndexInArr !== -1 && lastIndexInArr !== -1) {
  //   const temp = newArr[startIndexInArr].order;
  //   newArr[startIndexInArr].order = newArr[lastIndexInArr].order;
  //   newArr[lastIndexInArr].order = temp;
  // }

  // return newArr;
  const newArr = [...arr];

  // Phần tử được kéo
  const startIndexInArr = newArr.findIndex((item) => item.order === startIndex);
  const lastIndexInArr = newArr.findIndex((item) => item.order === lastIndex);

  console.log(startIndexInArr, lastIndexInArr);
  const [removed] = newArr.splice(startIndexInArr, 1);

  // // Chèn phần tử được kéo vào vị trí mới
  newArr.splice(lastIndexInArr, 0, removed);
  // console.log(newArr, "test");
  return newArr.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};
