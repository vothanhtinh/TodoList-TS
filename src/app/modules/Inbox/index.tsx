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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
import { useAppDispatch, useAppSelector } from "store/configStore";
import { selectInboxs, selectIsLoadingInbox } from "store/inboxSlice/selector";

// Components
import { InboxItem } from "app/modules/Inbox/components/InboxItem";
import Loading from "app/components/atoms/Loading";

import { getInboxsSaga, updateInboxsSaga } from "store/inboxSlice/inboxAction";
import * as inboxSlice from "store/inboxSlice";

// Utils
import { swapIndexInbox } from "utils";

const Inbox: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const [isAddTask, setIsAddTask] = useState(false);
  // get inbox from store
  const inboxs = useSelector(selectInboxs)?.filter(
    (inbox) => inbox.status === 0
  );
  const isLoading = useSelector(selectIsLoadingInbox);
  const onClickAddInbox = () => {
    setIsAddTask(true);
  };
  const onClickCancelInbox = () => {
    setIsAddTask(false);
  };
  useEffect(() => {
    dispatch(getInboxsSaga());
  }, []);

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
    const arrInbox = swapIndexInbox(inboxs, source.index, destination.index);
    dispatch(inboxSlice.updateInboxs(arrInbox));
    dispatch(updateInboxsSaga(arrInbox));
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="inbox">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ padding: 0 }}
              >
                {isLoading ? (
                  inboxs.map((inbox, index) => (
                    <Draggable
                      key={inbox.inboxId}
                      draggableId={inbox.inboxId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <InboxItem
                            key={inbox.inboxId}
                            title={inbox.title}
                            description={inbox.description}
                            status={inbox.status}
                            inboxId={inbox.inboxId}
                            id={inbox.id}
                            order={inbox.order}
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
