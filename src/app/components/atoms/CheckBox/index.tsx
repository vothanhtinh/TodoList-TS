// Libraries
import React from "react";

// Styled
import { CheckboxLable } from "./styled";

// Store
import { useAppDispatch } from "store/configStore";

// Actions Saga
import { changeStatusTodaySaga } from "store/todaySlice/todayAction";
import { changeStatusInboxSaga } from "store/inboxSlice/inboxAction";
import { updateInbox } from "store/inboxSlice";
import { updateToday } from "store/todaySlice";

interface CheckBoxProps {
  _id?: string;
  status: number;
  type: string;
  typeId: string;
  description: string;
  title: string;
  order: number;
}
export const Checkbox: React.FC<CheckBoxProps> = (props) => {
  const dispatch = useAppDispatch();
  const { _id, type, description, title, typeId } = props;
  const todayId = typeId;
  const inboxId = typeId;

  const ChangeStatus = () => {
    if (type === "inbox") {
      dispatch(updateInbox({ inboxId, ...props }));
      dispatch(
        changeStatusInboxSaga({ inboxId, status: 1, description, title, _id })
      );
    }

    if (type === "today") {
      dispatch(updateToday({ todayId, ...props }));
      dispatch(
        changeStatusTodaySaga({ todayId, status: 1, description, title, _id })
      );
    }
  };

  return (
    <CheckboxLable onClick={ChangeStatus}>
      <span></span>
    </CheckboxLable>
  );
};
