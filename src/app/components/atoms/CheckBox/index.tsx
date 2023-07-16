// Libraries
import React from "react";

// Styled
import { CheckboxLable } from "./styled";

//Store
import { useAppDispatch } from "store/configStore";

// Actions
import { changeStatusToday } from "constants/todayActionType";
import { changeStatusInbox } from "constants/inboxActionType";

interface CheckBoxProps {
  id: string;
  title: string;
  status: number;
  description: string;
  type: string;
}
export const Checkbox: React.FC<CheckBoxProps> = (props) => {
  const dispatch = useAppDispatch();

  const { id, title, status, description, type } = props;
  const todayId = id;
  const inboxId = id;
  const ChangeStatus = () => {
    if (type === "inbox") {
      dispatch(changeStatusInbox({ inboxId, title, status: 1, description }));
    }
    if (type === "today") {
      dispatch(changeStatusToday({ todayId, title, status: 1, description }));
    }
  };

  return (
    <CheckboxLable onClick={ChangeStatus}>
      <span></span>
    </CheckboxLable>
  );
};
