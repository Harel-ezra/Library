import { Button } from "@mui/material";
import sideBarTabStyle from "./sideBarTab.module.css";
import { ItemsList } from "../../../globalTypes/globalTypes";
import { barClicked } from "../../libraryContent/LibraryContent";

interface Props {
  text: string,
  onClicked: (barClicked:barClicked)=>void;
  barText:barClicked;
};

export const SideBarTab = (props: Props) => {
    const onClick=()=>
    {
        props.onClicked(props.barText);
    }
  return (
    <Button
      variant="contained"
      className={sideBarTabStyle.sideBarTab}
    onClick={onClick}
    >
      {props.text}
    </Button>
  );
};
