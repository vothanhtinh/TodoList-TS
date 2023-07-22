//Library
import { CalendarViewDayOutlined } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Components
import EmtyState from "app/components/atoms/EmtyState";
import AddTaskToday from "app/components/atoms/AddTaskToday";
import { TodayItem } from "app/modules/Today/components/TodayItem";
import Loading from "app/components/atoms/Loading";

// Styled
import {
  GroupIcon,
  InboxTitle,
  StyleInbox,
  TextBottom,
  TextHeader,
} from "./styled";

// Queries
import { useGetDataToday, useUpdateTodays } from "app/queries/Today";

// Utils
import { swapIndexToday } from "utils";

const ToDay: React.FC = () => {
  const { data, isLoading } = useGetDataToday();
  const mutation = useUpdateTodays();

  const todays = data
    ?.sort((a, b) => a.order - b.order)
    ?.filter((today) => today.status === 0);

  const [isClickAddTask, setIsClickAddTask] = useState(false);

  const onClickAddToday = () => {
    setIsClickAddTask(true);
  };
  const onClickCancelAddToday = () => {
    setIsClickAddTask(false);
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    // Kiểm tra ngoài phạm vi
    if (!destination) {
      return;
    }

    // Kiểm tra có cùng 1 vị trí hay không
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Thay đổi order của phần tử
    const arrToday = swapIndexToday(
      todays || [],
      source.index,
      destination.index
    );

    mutation.mutate(arrToday);
  };

  return (
    <>
      <StyleInbox>
        <InboxTitle>
          <TextHeader>
            Today
            <span>Fri 7 Jul</span>
          </TextHeader>
          <div>
            <GroupIcon startIcon={<CalendarViewDayOutlined />}>View</GroupIcon>
          </div>
        </InboxTitle>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todays">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ padding: 0 }}
              >
                {!isLoading ? (
                  todays?.map((today, index) => (
                    <Draggable
                      key={today.todayId}
                      draggableId={today.todayId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodayItem
                            title={today.title}
                            key={today.todayId}
                            todayId={today.todayId}
                            description={today.description}
                            status={today.status}
                            _id={today._id}
                            order={today.order}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <Loading />
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <AddTaskToday
          isClickAddTask={isClickAddTask}
          onClickAddToday={onClickAddToday}
          onClickCancelToday={onClickCancelAddToday}
        />
        {todays?.length === 0 && !isClickAddTask && (
          <>
            <EmtyState
              image={
                "https://todoist.b-cdn.net/assets/images/418012032c5aaee447289642c812e569.jpg"
              }
              title={"You're all done for the week, vothanhtinh147! "}
              description={
                "By default, tasks added here will be due today. Click + to add a task"
              }
            />
            <TextBottom>
              <FontAwesomeIcon icon={faQuestion} />
              <Link to={"/"}>
                <p>How to declutter your mind with the inbox</p>
              </Link>
            </TextBottom>
          </>
        )}
      </StyleInbox>
    </>
  );
};

export default ToDay;
