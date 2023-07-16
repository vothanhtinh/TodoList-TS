// Libaries
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

// Components
import FormAddInbox from "../../../modules/Inbox/components/FormAddInbox";

// Styled
import { StyleButton, StyleIcon, Text } from "./styled";

interface AddTaskProps {
  isClickAddTask: boolean;
  onClickAddTask: () => void;
  onClickCancelTask: () => void;
}

const AddTask: React.FC<AddTaskProps> = (props) => {
  const { isClickAddTask, onClickAddTask, onClickCancelTask } = props;
  const [task, setTask] = useState(false);

  const handleTask = () => {
    onClickAddTask();
    setTask(true);
  };

  const handleCancel = () => {
    onClickCancelTask();
    setTask(false);
  };

  return (
    <>
      {!isClickAddTask ? (
        <StyleButton onClick={handleTask}>
          <StyleIcon>
            <FontAwesomeIcon icon={faPlus} />
          </StyleIcon>
          <Text>Add task</Text>
        </StyleButton>
      ) : (
        <FormAddInbox task={task} onCancelForm={handleCancel} />
      )}
    </>
  );
};

export default AddTask;
