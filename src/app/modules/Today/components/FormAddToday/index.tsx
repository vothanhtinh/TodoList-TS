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

// Actions
// import { addTodaySaga, updateTodaySaga } from "store/todaySlice/todayAction";
import { useSelector } from "react-redux";
import { selectTodays } from "store/todaySlice/todaySlice";
import { useMutation } from "react-query";
import { createToday } from "services/today.api";
import { addToday } from "store/todaySlice";
// import { addToday, updateToday } from "store/todaySlice";

interface TaskProps {
  task?: boolean;
  onCancel: () => void;
  initialTask?: {
    _id?: string;
    todayId: string;
    title: string;
    description: string;
    status: number;
    order: number;
  };
}

const FormAddToday: React.FC<TaskProps> = ({ onCancel, initialTask }) => {
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState("");

  const [description, setDescription] = useState("");

  const todays = useSelector(selectTodays);

  const maxOrder =
    todays.length > 0 ? Math.max(...todays.map((today) => today.status)) : 0;

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

  const mutation = useMutation({
    mutationFn: createToday,
  });

  const handleAddTask = () => {
    if (initialTask) {
      // Update existing task
      const updatedToday = {
        _id: initialTask._id,
        todayId: initialTask.todayId,
        title: taskName,
        description: description,
        status: initialTask.status,
        order: initialTask.order,
      };

      // dispatch(updateToday(updatedToday));
      // dispatch(updateTodaySaga(updatedToday));
    } else {
      const newToday = {
        todayId: uuidv4(),
        title: taskName,
        description: description,
        status: 0,
        order: maxOrder + 1,
      };

      // dispatch(addTodaySaga(newToday));
      // dispatch(addToday(newToday));

      mutation.mutate(newToday);
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
