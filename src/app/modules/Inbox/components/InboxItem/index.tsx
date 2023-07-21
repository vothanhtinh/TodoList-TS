// Libraries
import React, { useState } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Components
import { ButtonIcon } from "app/components/atoms/ButtonIcon";
import { Checkbox } from "app/components/atoms/CheckBox";
import { MenuShowMoreInbox } from "./components/MenuShowMoreInbox/index";
import FormAddInbox from "../FormAddInbox";

// Styled
import { BlockStyle, LeftStyle, RightStyle, StyleText } from "./styled";

interface TaskItemProps {
  title: string;
  description: string;
  _id: string;
  status: number;
  inboxId: string;
  order: number;
}

export const InboxItem: React.FC<TaskItemProps> = (props) => {
  const [isEdit, setIsEdit] = useState(true);
  const [isShowMore, setIsShowMore] = useState(false);
  const { title, description, _id, status, order, inboxId } = props;
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
              type="inbox"
            />
            <StyleText>
              <div>{title}</div>
              <div className="des">{description}</div>
            </StyleText>
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
                <MenuShowMoreInbox
                  title={title}
                  description={description}
                  status={status}
                  id={_id}
                />
              </span>
            )}
          </RightStyle>
        </BlockStyle>
      ) : (
        <FormAddInbox
          onCancel={onCancel}
          initialTask={{
            _id,
            description,
            title,
            status,
            order,
            inboxId,
          }}
        />
      )}
    </div>
  );
};
