export interface TodayType {
  _id: string;
  todayId: string;
  title: string;
  description: string;
  status: number;
  order: number;
}

export type TodaysType = Pick<
  TodayType,
  "_id" | "todayId" | "title" | "description" | "order" | "status"
>[];
