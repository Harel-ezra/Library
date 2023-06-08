import { Button, Icon, IconProps, Typography } from "@mui/material";
import sideBarTabStyle from "./sideBarTab.module.css";
import { Bar } from "../../../pages/library/Library";

import { ReactElement } from "react";

interface Props {
  text: string;
  onClicked: (barClicked: Bar) => void;
  barText: Bar;
  icon: ReactElement<IconProps>;
}

export const SideBarTab = (props: Props) => {
  const onClick = () => {
    props.onClicked(props.barText);
  };
  return (
    <Button
      variant="text"
      className={sideBarTabStyle.sideBarTab}
      onClick={onClick}
    >
      {props.icon}
      <Typography className={sideBarTabStyle.text}>{props.text}</Typography>
      
    </Button>
  );
};
