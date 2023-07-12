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

// Styled
import {
  GroupIcon,
  InboxTitle,
  StyleInbox,
  TextBottom,
  TextHeader,
} from "./styled";

// Store
import { selectTodays } from "store/todaySlice/todaySlice";
import { useSelector } from "react-redux";

const ToDay: React.FC = () => {
  const [isClickAddTask, setIsClickAddTask] = useState(false);

  // get today from store
  const todays = useSelector(selectTodays).filter(
    (today) => today.status === 0
  );

  const ClickAdd = () => {
    setIsClickAddTask(true);
  };

  const ClickCancel = () => {
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
        {todays.map((today) => (
          <TodayItem
            title={today.title}
            key={today.id}
            id={today.id}
            description={today.description}
            status={today.status}
          />
        ))}
        <AddTaskToday
          clickAddTask={isClickAddTask}
          ClickAdd={ClickAdd}
          ClickCancel={ClickCancel}
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
