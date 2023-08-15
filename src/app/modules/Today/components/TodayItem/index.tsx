// Libraries
import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CSS } from "@dnd-kit/utilities";

// Components
import { ButtonIcon } from "app/components/atoms/ButtonIcon";
import { Checkbox } from "app/components/atoms/CheckBox";
import FormAddToday from "../FormAddToday";

// Styled
import { BlockStyle, LeftStyle, RightStyle } from "./styled";
import { MenuShowMoreToday } from "./components/MenuShowMoreToday";

// Type
import { TodayType } from "types/today.type";
import { useSortable } from "@dnd-kit/sortable";

export const TodayItem: React.FC<TodayType> = (props) => {
  const [isEdit, setIsEdit] = useState(true);
  const { title, description, _id, status, order, todayId } = props;
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props._id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    boxShadow: isDragging ? "0px 0px 2px 1px #ccc" : undefined,
  };

  return (
    <div>
      {isEdit ? (
        <BlockStyle
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
        >
          <LeftStyle>
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
