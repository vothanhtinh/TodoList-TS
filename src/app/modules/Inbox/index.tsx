// Libraries
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CalendarViewDayOutlined,
  ChatBubbleOutline,
  MoreHoriz,
} from "@mui/icons-material";

// Components
import AddTask from "app/components/atoms/AddTask";
import AddSection from "app/components/atoms/AddSection";
import EmtyState from "app/components/atoms/EmtyState";

//
import {
  GroupIcon,
  InboxTitle,
  StyleInbox,
  TextBottom,
  TextHeader,
} from "./styled";

// Store
import { useAppDispatch } from "store/configStore";
import { selectInboxs } from "store/inboxSlice/selector";

// Components
import { InboxItem } from "app/modules/Inbox/components/InboxItem";

import { getInboxs } from "store/inboxSlice/inboxAction";

const Inbox: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const [isAddTask, setIsAddTask] = useState(false);

  useEffect(() => {
    dispatch(getInboxs());
  }, []);

  // get inbox from store
  const inboxs = useSelector(selectInboxs)?.filter(
    (inbox) => inbox.status === 0
  );

  const onClickAddInbox = () => {
    setIsAddTask(true);
  };

  const onClickCancelInbox = () => {
    setIsAddTask(false);
  };

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
        {inboxs.map((inbox) => (
          <InboxItem
            key={inbox.inboxId}
            title={inbox.title}
            description={inbox.description}
            status={inbox.status}
            inboxId={inbox.inboxId}
            id={inbox.id}
          />
        ))}
        <AddTask
          isClickAddTask={isAddTask}
          onClickAddTask={onClickAddInbox}
          onClickCancelTask={onClickCancelInbox}
        />
        <AddSection />
        {inboxs.length === 0 && !isAddTask && (
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
