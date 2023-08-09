//Library
import { CalendarViewDayOutlined } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

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
import { useGetDataToday } from "app/queries/Today";

const ToDay: React.FC = () => {
  const { data, isLoading } = useGetDataToday();

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
        <DndProvider backend={HTML5Backend}>
          {!isLoading ? (
            todays?.map((today, index) => (
              <TodayItem
                title={today.title}
                key={today.todayId}
                todayId={today.todayId}
                description={today.description}
                status={today.status}
                _id={today._id}
                order={today.order}
                index={index}
              />
            ))
          ) : (
            <Loading />
          )}
        </DndProvider>
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
