// Libraries
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

// Styled
import { StyleButton, StyleIcon, Text } from "./styled";

// Components
import FormAddToday from "app/modules/Today/components/FormAddToday";

interface AddTaskProps {
  isClickAddTask: boolean;
  onClickAddTask: () => void;
  onClickCancelTask: () => void;
}

const AddTaskToday: React.FC<AddTaskProps> = (props) => {
  const { isClickAddTask, onClickAddTask, onClickCancelTask } = props;
  const [task, setTask] = useState(false);

  const onHandleTask = () => {
    onClickAddTask();
    setTask(true);
  };

  const onHandleCancel = () => {
    onClickCancelTask();
    setTask(false);
  };

  return (
    <>
      {!isClickAddTask ? (
        <StyleButton onClick={onHandleTask}>
          <StyleIcon>
            <FontAwesomeIcon icon={faPlus} />
          </StyleIcon>
          <Text>Add task</Text>
        </StyleButton>
      ) : (
        <FormAddToday task={task} onCancel={onHandleCancel} />
      )}
    </>
  );
};

export default AddTaskToday;
