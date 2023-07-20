//Library
import { CalendarViewDayOutlined } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AppsIcon from "@mui/icons-material/Apps";

// Components
import EmtyState from "app/components/atoms/EmtyState";
import AddTaskToday from "app/components/atoms/AddTaskToday";
import { ButtonIcon } from "app/components/atoms/ButtonIcon";
import Loading from "app/components/atoms/Loading";
import { TodayItem } from "app/modules/Today/components/TodayItem";

// Styled
import {
  DropButtonStyle,
  GroupIcon,
  InboxTitle,
  Item,
  StyleInbox,
  TextBottom,
  TextHeader,
} from "./styled";

// Store
import {
  selectIsLoadingToday,
  selectTodays,
} from "store/todaySlice/todaySlice";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { getTodaysSaga, updateTodaysSaga } from "store/todaySlice/todayAction";
import * as todaySlice from "store/todaySlice";

// Utils
import { swapIndexToday } from "utils";

const ToDay: React.FC = () => {
  const dispatch = useDispatch();
  const [isClickAddTask, setIsClickAddTask] = useState(false);
  const todays = useSelector(selectTodays)?.filter(
    (today) => today?.status === 0
  );
  const isLoading = useSelector(selectIsLoadingToday);
  const onClickAddToday = () => {
    setIsClickAddTask(true);
  };
  const onClickCancelToday = () => {
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
    const arrToday = swapIndexToday(todays, source.index, destination.index);

    dispatch(todaySlice.updateTodays(arrToday));
    dispatch(updateTodaysSaga(arrToday));
  };

  useEffect(() => {
    dispatch(getTodaysSaga());
  }, []);

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
                {isLoading ? (
                  todays.map((today, index) => (
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
                          <Item>
                            <DropButtonStyle>
                              <ButtonIcon iconStart={AppsIcon} />
                            </DropButtonStyle>
                            <TodayItem
                              title={today.title}
                              key={today.todayId}
                              todayId={today.todayId}
                              description={today.description}
                              status={today.status}
                              id={today.id}
                              order={today.order}
                            />
                          </Item>
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
          onClickAddTask={onClickAddToday}
          onClickCancelTask={onClickCancelToday}
        />
        {todays.length === 0 && !isClickAddTask && (
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
