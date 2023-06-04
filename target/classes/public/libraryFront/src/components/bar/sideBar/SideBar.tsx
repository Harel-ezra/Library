import sideBarStyle from "./sideBar.module.css";
import { Box } from "@mui/material";
import { SideBarTab } from "./SideBarTab";
import { ItemsList } from "../../../globalTypes/globalTypes";
import { LibraryLogo } from "../../logo/LibraryLogo";
import { barClicked } from "../../../pages/library/Library";
interface Props {
  onClicked: (barClicked: barClicked) => void;
}
export const SideBar = (props: Props) => {
  return (
    <Box className={sideBarStyle.sideBarBox}>
      <LibraryLogo />

      <SideBarTab
        onClicked={props.onClicked}
        barText="users"
        text="משתמשים"
      />
      <SideBarTab
        onClicked={props.onClicked}
        barText="books"
        text="ספרים"
      />
      <SideBarTab
        onClicked={props.onClicked}
        barText="authors"
        text="סופרים"
      />
    </Box>
  );
};
