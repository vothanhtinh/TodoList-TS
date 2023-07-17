// Libraries
import React from "react";

// Styled
import { CheckboxLable } from "./styled";

//Store
import { useAppDispatch } from "store/configStore";

// Actions
import { changeStatusToday } from "store/todaySlice/todayAction";
import { changeStatusInbox } from "store/inboxSlice/inboxAction";

interface CheckBoxProps {
  id?: string;
  status: number;
  type: string;
  typeId: string;
  description: string;
  title: string;
}
export const Checkbox: React.FC<CheckBoxProps> = (props) => {
  const dispatch = useAppDispatch();

  const { id, status, type, description, title, typeId } = props;
  const todayId = typeId;
  const inboxId = typeId;
  const ChangeStatus = () => {
    if (type === "inbox") {
      dispatch(
        changeStatusInbox({ inboxId, status: 1, description, title, id })
      );
    }
    if (type === "today") {
      dispatch(
        changeStatusToday({ todayId, status: 1, description, title, id })
      );
    }
  };

  return (
    <CheckboxLable onClick={ChangeStatus}>
      <span></span>
    </CheckboxLable>
  );
};
