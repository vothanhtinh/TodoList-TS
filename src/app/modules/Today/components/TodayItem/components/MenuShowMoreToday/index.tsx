// Libraries
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import Cloud from "@mui/icons-material/Cloud";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";

// Styled
import { MenuDeleteStyle, PaperStyle } from "./styled";

// Components
import { MenuIconItem } from "app/components/atoms/MenuIconItem";

// Store
import { useAppDispatch } from "store/configStore";
import { deleteTodaySaga } from "store/todaySlice/todayAction";

interface TaskItemProps {
  _id?: string;
  title: string;
  description: string;
  todayId: string;
  status: number;
}

export const MenuShowMoreToday: React.FC<TaskItemProps> = (props) => {
  const { _id } = props;

  const dispatch = useAppDispatch();
  const ClickDeleteToday = () => {
    dispatch(deleteTodaySaga({ _id }));
  };

  return (
    <PaperStyle>
      <MenuList>
        <MenuIconItem
          title={"Edit task"}
          icon={<BorderColorOutlinedIcon />}
          sub={"Ctrl E"}
        />
        <MenuIconItem
          title={"Go to project"}
          icon={<FormatListBulletedOutlinedIcon />}
          sub={"⇧ G"}
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

        <MenuDeleteStyle onClick={ClickDeleteToday}>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuDeleteStyle>
      </MenuList>
    </PaperStyle>
  );
};
