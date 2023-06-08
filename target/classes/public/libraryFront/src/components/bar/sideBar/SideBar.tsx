import sideBarStyle from "./sideBar.module.css";
import { Box } from "@mui/material";
import { SideBarTab } from "./SideBarTab";
import { LibraryLogo } from "../../logo/LibraryLogo";
import { Bar } from "../../../pages/library/Library";
import PeopleIcon from '@mui/icons-material/People';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
interface Props {
  onClicked: (barClicked: Bar) => void;
}
export const SideBar = (props: Props) => {
  return (
    <Box className={sideBarStyle.sideBarBox}>
      <LibraryLogo />

      <SideBarTab
        onClicked={props.onClicked}
        barText="users"
        text="משתמשים"
        icon={<PeopleIcon />}
      />
      <SideBarTab
        onClicked={props.onClicked}
        barText="books"
        text="ספרים"
        icon={<AutoStoriesIcon />}

      />
      <SideBarTab
        onClicked={props.onClicked}
        barText="authors"
        text="סופרים"
        icon={<HistoryEduIcon />}
      />
    </Box>
  );
};
