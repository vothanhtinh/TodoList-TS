//Library
import { CalendarViewDayOutlined } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import { Link } from "react-router-dom";

import {
  DndContext,
  DragOverlay,
  DropAnimation,
  PointerSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Components
import EmtyState from "app/components/atoms/EmtyState";
import AddTaskToday from "app/components/atoms/AddTaskToday";
import { TodayItem } from "app/modules/Today/components/TodayItem";
import Loading from "app/components/atoms/Loading";

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

// Queries
import { useGetDataToday, useUpdateTodays } from "app/queries/Today";
import { ButtonIcon } from "app/components/atoms/ButtonIcon";
import { TodayType } from "types/today.type";

// Utils

const ToDay: React.FC = () => {
  const [activeId, setActiveId] = useState(null);
  const [activeDragData, setActiveDragData] = useState<TodayType>();

  const { data, isLoading } = useGetDataToday();
  const mutation = useUpdateTodays();

  const todays = data
    ?.sort((a, b) => a.order - b.order)
    ?.filter((today) => today.status === 0);

  const [listToday, setListToday] = useState<TodayType[]>([]);
  useEffect(() => {
    if (todays) {
      setListToday(todays);
    }
  }, [data]);

  const itemIds = useMemo(() => todays?.map((item: any) => item._id), [todays]);

  const [isClickAddTask, setIsClickAddTask] = useState(false);

  const onClickAddToday = () => {
    setIsClickAddTask(true);
  };
  const onClickCancelAddToday = () => {
    setIsClickAddTask(false);
  };

  // avtive khi thả
  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  const handleOnDragStart = (event: any) => {
    const { active } = event;
    if (!active) {
      return;
    }
    setActiveId(active?.id);
    if (todays) {
      setActiveDragData(todays[active?.data?.current?.sortable?.index]);
    }
  };
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    // Check over null
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex =
        todays?.findIndex((today: any) => today._id === active.id) ?? -1;
      const newIndex =
        todays?.findIndex((today: any) => today._id === over.id) ?? -1;

      if (todays && oldIndex !== -1 && newIndex !== -1) {
        const orderArr = arrayMove(todays, oldIndex, newIndex);

        for (let i = 0; i < orderArr.length; i++) {
          console.log(i);
          orderArr[i] = { ...orderArr[i], order: i + 1 };
        }

        setListToday(orderArr);
        mutation.mutate(orderArr);
      }
    }
    setActiveId(null);
    setActiveDragData(undefined);
  };

  // handle click trigger event
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const mySensor = useSensors(pointerSensor);

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
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={mySensor}
          onDragStart={handleOnDragStart}
        >
          <SortableContext
            items={itemIds || []}
            strategy={verticalListSortingStrategy}
          >
            {!isLoading ? (
              listToday?.map((today, index) => (
                <>
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
                      _id={today._id}
                      order={today.order}
                    />
                  </Item>
                </>
              ))
            ) : (
              <Loading />
            )}
          </SortableContext>

          <DragOverlay dropAnimation={dropAnimationConfig}>
            {activeId && activeDragData && <TodayItem {...activeDragData} />}
          </DragOverlay>
        </DndContext>

        <AddTaskToday
          isClickAddTask={isClickAddTask}
          onClickAddToday={onClickAddToday}
          onClickCancelToday={onClickCancelAddToday}
        />
        {listToday?.length === 0 && !isClickAddTask && (
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
