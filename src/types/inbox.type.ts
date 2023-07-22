export interface InboxType {
  _id: string;
  inboxId: string;
  title: string;
  description: string;
  status: number;
  order: number;
}

export type InboxsType = Pick<
  InboxType,
  "_id" | "inboxId" | "title" | "description" | "order" | "status"
>[];
