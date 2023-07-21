// Libraries
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarViewDayOutlined,
  ChatBubbleOutline,
  MoreHoriz,
} from "@mui/icons-material";

// Components
import AddTask from "app/components/atoms/AddTask";
import AddSection from "app/components/atoms/AddSection";
import EmtyState from "app/components/atoms/EmtyState";

// Styled
import {
  GroupIcon,
  InboxTitle,
  StyleInbox,
  TextBottom,
  TextHeader,
} from "./styled";

// Services
import { getInbox } from "services/inbox.api";

// Components
import { InboxItem } from "app/modules/Inbox/components/InboxItem";
import Loading from "app/components/atoms/Loading";

const Inbox: React.FC = React.memo(() => {
  const [isAddTask, setIsAddTask] = useState(false);

  const onClickAdd = () => {
    setIsAddTask(true);
  };

  const onClickCancel = () => {
    setIsAddTask(false);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["inbox"],
    queryFn: getInbox,
    keepPreviousData: true,
  });
  return (
    <>
      <StyleInbox>
        <InboxTitle>
          <TextHeader>Inbox</TextHeader>
          <div>
            <GroupIcon startIcon={<CalendarViewDayOutlined />}>View</GroupIcon>
            <GroupIcon startIcon={<ChatBubbleOutline />}>Comment</GroupIcon>
            <GroupIcon startIcon={<MoreHoriz />}></GroupIcon>
          </div>
        </InboxTitle>
        {isLoading ? (
          <Loading />
        ) : (
          data?.data.map((inbox) => (
            <InboxItem
              inboxId={inbox.inboxId}
              title={inbox.title}
              key={inbox._id}
              _id={inbox._id}
              description={inbox.description}
              status={inbox.status}
              order={inbox.order}
            />
          ))
        )}
        <AddTask
          clickAddTask={isAddTask}
          onClickAdd={onClickAdd}
          onClickCancel={onClickCancel}
        />
        <AddSection />
        {data?.data.length === 0 && !isAddTask && (
          <>
            <EmtyState
              image={
                "https://todoist.b-cdn.net/assets/images/c85c3d1811442a987adb401a5bd11814.jpg"
              }
              title={"Your peace of mind is priceless"}
              description={
                "Well done, vothanhtinh147! All your team's tasks are organized in the right place."
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
});

export default Inbox;
