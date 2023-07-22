//Library
import { CalendarViewDayOutlined } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {todays?.map((today) => (
              <TodayItem
                todayId={today.todayId}
                title={today.title}
                key={today._id}
                _id={today._id}
                description={today.description}
                status={today.status}
                order={today.order}
              />
            ))}
            <AddTaskToday
              isClickAddTask={isClickAddTask}
              onClickAddToday={onClickAddToday}
              onClickCancelToday={onClickCancelAddToday}
            />
          </>
        )}
        {data?.length === 0 && !isClickAddTask && (
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
