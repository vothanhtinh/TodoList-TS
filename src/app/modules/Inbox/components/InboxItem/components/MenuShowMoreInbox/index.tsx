// Libraries
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import StraightIcon from "@mui/icons-material/Straight";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SouthIcon from "@mui/icons-material/South";
import Cloud from "@mui/icons-material/Cloud";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";

// Styled
import { MenuDeleteStyle, PaperStyle } from "./styled";
import { MenuIconItem } from "app/components/atoms/MenuIconItem";

// Store
import { useAppDispatch } from "store/configStore";

// Actions
import { deleteInboxSaga } from "store/inboxSlice/inboxAction";

interface TaskItemProps {
  _id?: string;
  title: string;
  description: string;
  inboxId: string;
  status: number;
}
export const MenuShowMoreInbox: React.FC<TaskItemProps> = (props) => {
  const { title, description, inboxId, status, _id } = props;

  const dispatch = useAppDispatch();

  const onClickDeleteInbox = () => {
    dispatch(deleteInboxSaga({ title, description, inboxId, status, _id }));
  };
  return (
    <PaperStyle>
      <MenuList>
        <MenuIconItem title={"Add task above"} icon={<StraightIcon />} />
        <MenuIconItem title={"Add task below"} icon={<SouthIcon />} />
        <MenuIconItem
          title={"Edit task"}
          icon={<BorderColorIcon />}
          sub="Ctrl E"
        />
        <Divider />
        <MenuIconItem
          title={"Move to project"}
          icon={<ArrowCircleRightIcon />}
          sub="V"
        />
        <MenuIconItem title={"Duplicate"} icon={<ContentCopyIcon />} />
        <MenuIconItem
          title={"Copy Link to task"}
          icon={<AttachFileOutlinedIcon />}
          sub="V"
        />
        <Divider />
        <MenuIconItem
          title={"Add extention..."}
          icon={<ExtensionOutlinedIcon />}
        />
        <Divider />

        <MenuDeleteStyle onClick={onClickDeleteInbox}>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuDeleteStyle>
      </MenuList>
    </PaperStyle>
  );
};
