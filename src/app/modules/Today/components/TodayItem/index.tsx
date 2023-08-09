// Libraries
import React, { useRef, useState } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Components
import { ButtonIcon } from "app/components/atoms/ButtonIcon";
import { Checkbox } from "app/components/atoms/CheckBox";
import FormAddToday from "../FormAddToday";

// Styled
import { BlockStyle, LeftStyle, RightStyle } from "./styled";
import { MenuShowMoreToday } from "./components/MenuShowMoreToday";

// Type
import { TodayType } from "types/today.type";
import { useDrag, useDrop } from "react-dnd";
import { swapIndexToday } from "utils";
import { useGetDataToday, useUpdateTodays } from "app/queries/Today";
import AddBlockEmpty from "app/components/organisms/components/AddBlockEmpty";

export const TodayItem: React.FC<TodayType> = (props) => {
  const { data } = useGetDataToday();
  const mutation = useUpdateTodays();

  const [isEdit, setIsEdit] = useState(true);

  const [showArea, setShowArea] = useState({
    top: false,
    bottom: false,
  });

  const ref = useRef<any>(null);

  const { title, description, _id, status, order, todayId, index } = props;
  const [isShowMore, setIsShowMore] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const ClickEdit = (id: string) => {
    setIsEdit(false);
  };

  const onCancel = () => {
    setIsEdit(true);
  };
  const ClickShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  // React DND

  const [{ isDragging }, drag] = useDrag({
    type: "TODAY",
    item: () => {
      return { _id, order };
    },
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  const [{ isOverDropWrapper }, drop] = useDrop({
    accept: "TODAY",

    collect(monitor) {
      return {
        isOverDropWrapper: monitor.isOver(),
      };
    },
    drop(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const startIndex = item.order;
      const lastIndex = order;
      if (startIndex === lastIndex) {
        return;
      }

      setShowArea({
        top: false,
        bottom: false,
      });
    },
    hover: (item: any, monitor) => {
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const mouseOffset = monitor.getClientOffset();

      if (!mouseOffset?.y) return;

      const hoverClientY = mouseOffset.y - hoverBoundingRect.top;

      setShowArea({
        top: hoverClientY < hoverMiddleY,
        bottom: hoverClientY > hoverMiddleY,
      });
    },
  });

  const [{ isOverTopBlockEmpty }, emptyTopDrop] = useDrop({
    accept: "TODAY",
    collect(monitor) {
      return {
        isOverTopBlockEmpty: monitor.isOver(),
      };
    },
    drop: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }
      const startIndex = item.order;
      const lastIndex = order;
      if (startIndex === lastIndex) {
        return;
      }

      if (data) {
        const newArr = swapIndexToday(data, startIndex, lastIndex);
        mutation.mutate(newArr);
      }
      setShowArea({
        top: false,
        bottom: false,
      });
    },
  });

  const [{ isOverBottomBlockEmpty }, emptyBottomDrop] = useDrop({
    accept: "TODAY",
    collect(monitor) {
      return {
        isOverBottomBlockEmpty: monitor.isOver(),
      };
    },

    drop: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }
      const startIndex = item.order;
      const lastIndex = order;
      if (startIndex === lastIndex) {
        return;
      }

      if (data) {
        console.log("bottom");
        const newArr = swapIndexToday(data, startIndex, lastIndex + 1);
        mutation.mutate(newArr);
      }
      setShowArea({
        top: false,
        bottom: false,
      });
    },
  });

  drag(drop(ref));

  const isRenderTopEmpty =
    (showArea.top && index === 0 && isOverDropWrapper) || isOverTopBlockEmpty;
  return (
    <div>
      {isEdit ? (
        <>
          <AddBlockEmpty isShow={isRenderTopEmpty} ref={emptyTopDrop} />
          <BlockStyle
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <LeftStyle>
              {!isShowMore && (
                <div
                  className={`hide ${isHovered ? "show" : ""}`}
                  style={{ marginLeft: "-30px" }}
                >
                  <ButtonIcon iconStart={AppsIcon} />
                </div>
              )}
              <Checkbox
                _id={_id}
                title={title}
                status={status}
                description={description}
                typeId={todayId}
                order={order}
                type="today"
              />
              <span>{title}</span>
            </LeftStyle>
            <RightStyle className={`hide ${isHovered ? "show" : ""}`}>
              {!isShowMore && (
                <>
                  <span onClick={() => ClickEdit(_id)}>
                    <ButtonIcon iconStart={BorderColorIcon} />
                  </span>
                  <ButtonIcon iconStart={CalendarTodayIcon} />
                  <ButtonIcon iconStart={ChatBubbleOutlineIcon} />
                  <span onClick={ClickShowMore}>
                    <ButtonIcon iconStart={MoreHorizIcon} />
                  </span>
                </>
              )}
              {isShowMore && (
                <span onClick={ClickShowMore}>
                  <ButtonIcon iconStart={MoreHorizIcon} />
                  <MenuShowMoreToday
                    title={title}
                    description={description}
                    status={status}
                    _id={_id}
                    todayId={todayId}
                    order={order}
                  />
                </span>
              )}
            </RightStyle>
          </BlockStyle>
          <AddBlockEmpty
            isShow={
              (isOverDropWrapper && showArea.bottom) || isOverBottomBlockEmpty
            }
            ref={emptyBottomDrop}
          />
        </>
      ) : (
        <FormAddToday
          onCancel={onCancel}
          initialTask={{
            _id,
            description,
            title,
            status,
            todayId,
            order,
          }}
        />
      )}
    </div>
  );
};
