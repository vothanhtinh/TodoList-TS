export interface InboxType {
  _id: string;
  inboxId: string;
  title: string;
  description: string;
  status: number;
  order: number;
}

export type TodaysType = Pick<
  InboxType,
  "_id" | "inboxId" | "title" | "description" | "order" | "status"
>[];
