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
  _id?: string;
  title: string;
  description: string;
  inboxId: string;
  status: number;
  order: number;
}

export const InboxItem: React.FC<TaskItemProps> = (props) => {
  const [isEdit, setIsEdit] = useState(true);
  const [isShowMore, setIsShowMore] = useState(false);
  const { title, description, inboxId, status, _id, order } = props;
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
                style={{ marginLeft: "-32px" }}
              >
                <ButtonIcon iconStart={AppsIcon} />
              </div>
            )}
            <Checkbox
              _id={_id}
              status={status}
              description={description}
              title={title}
              typeId={inboxId}
              order={order}
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
                <span onClick={() => ClickEdit(inboxId)}>
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
                  _id={_id}
                  title={title}
                  description={description}
                  status={status}
                  inboxId={inboxId}
                  order={order}
                />
              </span>
            )}
          </RightStyle>
        </BlockStyle>
      ) : (
        <FormAddInbox
          onCancelForm={onCancel}
          initialTask={{
            _id,
            inboxId,
            description,
            title,
            status,
            order,
          }}
        />
      )}
    </div>
  );
};
