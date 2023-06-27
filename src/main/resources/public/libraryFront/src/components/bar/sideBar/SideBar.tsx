import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PeopleIcon from "@mui/icons-material/People";
import { Box } from "@mui/material";
import sideBarStyle from "./sideBar.module.css";
import { SideBarTab } from "./SideBarTab";
import { EntityType } from "src/globalTypes/EntityType";
import LibraryLogoLogOut from "src/components/dialog/LibraryLogoLogOut";

interface Props {
  onClick: (barClicked: EntityType) => void;
}
export const SideBar = (props: Props) => {
  return (
    <Box className={sideBarStyle.sideBarBox}>
      <LibraryLogoLogOut />
      <SideBarTab
        onClick={props.onClick}
        bar="User"
        text="משתמשים"
        icon={<PeopleIcon />}
      />
      <SideBarTab
        onClick={props.onClick}
        bar="Book"
        text="ספרים"
        icon={<AutoStoriesIcon />}
      />
      <SideBarTab
        onClick={props.onClick}
        bar="Author"
        text="סופרים"
        icon={<HistoryEduIcon />}
      />
    </Box>
  );
};
