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

// Queries
import {
  useAddInbox,
  useGetDataInbox,
  useUpdateInbox,
} from "app/queries/Inbox";

interface TaskProps {
  task?: boolean;
  onCancel: () => void;
  initialTask?: {
    _id: string;
    title: string;
    description: string;
    status: number;
    inboxId: string;
    order: number;
  };
}

const FormAddToday: React.FC<TaskProps> = ({ onCancel, initialTask }) => {
  const { data } = useGetDataInbox();
  const mutationAdd = useAddInbox();
  const mutationUpdate = useUpdateInbox();

  const maxOrder =
    data && data?.length > 0
      ? Math.max(...data?.map((inbox) => inbox.order))
      : 0;

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const isAddButtonDisabled = useMemo(() => !taskName.trim(), [taskName]);

  useEffect(() => {
    if (initialTask) {
      setTaskName(initialTask.title);
      setDescription(initialTask.description);
    }
  }, [initialTask]);

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
    onCancel();
  };

  const handleAddTask = () => {
    if (initialTask) {
      // Update existing task
      const updateInbox = {
        _id: initialTask._id,
        title: taskName,
        description: description,
        status: initialTask.status,
        order: initialTask.order,
        inboxId: initialTask.inboxId,
      };
      mutationUpdate.mutate(updateInbox);
    } else {
      // Add new task
      const newinbox = {
        inboxId: uuidv4(),
        title: taskName,
        description: description,
        status: 0,
        order: maxOrder + 1,
      };
      mutationAdd.mutate(newinbox);
    }

    // Reset the form
    setTaskName("");
    setDescription("");
    onCancel();
  };

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
