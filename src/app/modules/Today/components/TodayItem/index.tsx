// Libraries
import React, { useState } from "react";
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

interface TaskItemProps {
  _id?: string;
  title: string;
  description: string;
  todayId: string;
  status: number;
  order: number;
}

export const TodayItem: React.FC<TaskItemProps> = (props) => {
  const [isEdit, setIsEdit] = useState(true);
  const { title, description, todayId, status, _id } = props;
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
  return (
    <div>
      {isEdit ? (
        <BlockStyle
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <LeftStyle>
            <Checkbox
              _id={_id}
              status={status}
              typeId={todayId}
              description={description}
              title={title}
              type="today"
            />
            <span>{title}</span>
          </LeftStyle>
          <RightStyle className={`hide ${isHovered ? "show" : ""}`}>
            {!isShowMore && (
              <>
                <span onClick={() => ClickEdit(todayId)}>
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
                  _id={_id}
                  title={title}
                  description={description}
                  status={status}
                  todayId={todayId}
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
            todayId,
            description,
            title,
            status,
          }}
        />
      )}
    </div>
  );
};
