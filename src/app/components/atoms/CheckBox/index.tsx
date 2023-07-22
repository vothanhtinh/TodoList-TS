// Libraries
import React from "react";

// Styled
import { CheckboxLable } from "./styled";

// Queries
import { useUpdateToday } from "app/queries/Today";
import { useUpdateInbox } from "app/queries/Inbox";

interface CheckBoxProps {
  title: string;
  status: number;
  description: string;
  type: string;
  _id: string;
  order: number;
  typeId: string;
}

export const Checkbox: React.FC<CheckBoxProps> = (props) => {
  const { _id, title, status, description, type, typeId, order } = props;

  const mutationToday = useUpdateToday();
  const mutationInbox = useUpdateInbox();
  const ChangeStatus = () => {
    if (type === "inbox") {
      mutationInbox.mutate({
        _id,
        title,
        status: 1,
        order,
        description,
        inboxId: typeId,
      });
    }
    if (type === "today") {
      mutationToday.mutate({
        _id,
        title,
        status: 1,
        todayId: typeId,
        description,
        order,
      });
    }
  };

  return (
    <CheckboxLable onClick={ChangeStatus}>
      <span></span>
    </CheckboxLable>
  );
};
