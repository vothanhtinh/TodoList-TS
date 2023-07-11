// Libraries
import { useState, useEffect } from "react";
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
import { addToday, updateToday } from "store/todaySlice";

interface TaskProps {
  task?: boolean;
  onCancel: () => void;
  initialTask?: {
    id: string;
    title: string;
    description: string;
    status: number;
  };
}

const FormAddToday: React.FC<TaskProps> = ({ onCancel, initialTask }) => {
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

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
      const updatedToday = {
        id: initialTask.id,
        title: taskName,
        description: description,
        status: initialTask.status,
      };

      dispatch(updateToday(updatedToday));
    } else {
      // Add new task
      const newToday = {
        id: uuidv4(),
        title: taskName,
        description: description,
        status: 0,
      };

      dispatch(addToday(newToday));
    }

    // Reset the form
    setTaskName("");
    setDescription("");
    onCancel();
  };

  const isAddButtonDisabled = taskName.trim() === "";
  console.log(isAddButtonDisabled);
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
