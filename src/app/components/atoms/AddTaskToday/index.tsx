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
  ClickAddTask: () => void;
  ClickCancelTask: () => void;
}

const AddTaskToday: React.FC<AddTaskProps> = (props) => {
  const { isClickAddTask, ClickAddTask, ClickCancelTask } = props;
  const [task, setTask] = useState(false);

  const handleTask = () => {
    ClickAddTask();
    setTask(true);
  };

  const handleCancel = () => {
    ClickCancelTask();
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
        <FormAddToday task={task} onCancel={handleCancel} />
      )}
    </>
  );
};

export default AddTaskToday;
