// Libraries
import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

// Icons
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import PlaceIcon from "@mui/icons-material/Place";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InboxIcon from "@mui/icons-material/Inbox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Components
import { ButtonIconBorder } from "app/components/atoms/ButtonIconBorder";
import { ButtonColorIcon } from "app/components/atoms/ButtonColorIcon";

// Styled
import {
  ButtonGroup,
  ButtonGroupIcon,
  FormContainer,
  FormInput,
  PaddingStyle,
  StyleButton,
} from "./styled";

// Store
import { useAppDispatch } from "store/configStore";

//Actions Saga
import { addInboxSaga, updateInboxSaga } from "store/inboxSlice/inboxAction";
import { selectInboxs } from "store/inboxSlice/selector";
import { useSelector } from "react-redux";

interface TaskProps {
  task?: boolean;
  onCancelForm: () => void;
  initialTask?: {
    id?: string;
    inboxId: string;
    title: string;
    description: string;
    status: number;
  };
}

const FormAddToday: React.FC<TaskProps> = ({ onCancelForm, initialTask }) => {
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState("");

  const [description, setDescription] = useState("");

  const isAddButtonDisabled = useMemo(() => !taskName.trim(), [taskName]);

  const inboxs = useSelector(selectInboxs);

  const maxOrder =
    inboxs.length > 0 ? Math.max(...inboxs.map((inbox) => inbox.order)) : -1;

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleCancel = () => {
    setTaskName("");
    setDescription("");
    onCancelForm();
  };

  const handleAddTask = () => {
    if (initialTask) {
      // Update existing task
      const updatedInbox = {
        id: initialTask.id,
        inboxId: initialTask.inboxId,
        title: taskName,
        description: description,
        status: initialTask.status,
      };

      dispatch(updateInboxSaga(updatedInbox));
    } else {
      // Add new task
      const newInbox = {
        inboxId: uuidv4(),
        title: taskName,
        description: description,
        status: 0,
        order: maxOrder + 1,
      };

      dispatch(addInboxSaga(newInbox));
    }

    // Reset the form
    setTaskName("");
    setDescription("");
    onCancelForm();
  };

  useEffect(() => {
    if (initialTask) {
      setTaskName(initialTask.title);
      setDescription(initialTask.description);
    }
  }, [initialTask]);

  return (
    <FormContainer>
      <FormInput
        type="text"
        className="taskname"
        placeholder="Task Name"
        value={taskName}
        onChange={handleTaskNameChange}
      />
      <FormInput
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <ButtonGroupIcon>
        <ButtonIconBorder title="Due Date" icon={CalendarTodayIcon} sub="" />
        <ButtonIconBorder title="Priority" icon={EmojiFlagsIcon} sub="" />
        <ButtonIconBorder title="Reminders" icon={AccessAlarmIcon} sub="Pro" />
        <ButtonIconBorder title="Location" icon={PlaceIcon} sub="Pro" />
        <ButtonIconBorder title="" icon={MoreHorizIcon} sub="" />
      </ButtonGroupIcon>
      <ButtonGroup>
        <PaddingStyle>
          <ButtonColorIcon
            title="Inbox"
            iconStart={InboxIcon}
            iconEnd={ArrowDropDownIcon}
          />
        </PaddingStyle>
        <PaddingStyle>
          <StyleButton onClick={handleCancel}>Cancel</StyleButton>
          <StyleButton
            disabled={isAddButtonDisabled}
            onClick={handleAddTask}
            className="addTask"
          >
            {initialTask ? "Save Change" : "Add Task"}
          </StyleButton>
        </PaddingStyle>
      </ButtonGroup>
    </FormContainer>
  );
};

export default FormAddToday;
