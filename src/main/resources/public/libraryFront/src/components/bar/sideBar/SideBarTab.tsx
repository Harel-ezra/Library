import { ReactElement } from "react";
import { Button, IconProps, Typography } from "@mui/material";
import sideBarTabStyle from "./sideBar.module.css";
import { EntityType } from "src/globalTypes/EntityType";

interface Props {
  text: string;
  onClick: (barClicked: EntityType) => void;
  bar: EntityType;
  icon: ReactElement<IconProps>;
}

export const SideBarTab = (props: Props) => {
  const onClick = () => {
    props.onClick(props.bar);
  };
  return (
    <Button
      variant="text"
      className={sideBarTabStyle.sideBarTab}
      onClick={onClick}
    >
      {props.icon}
      <Typography
        className={sideBarTabStyle.text}
        sx={{ color: "primary.main" }}
      >
        {props.text}
      </Typography>
    </Button>
  );
};
