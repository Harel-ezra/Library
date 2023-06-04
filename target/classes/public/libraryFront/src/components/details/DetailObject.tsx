import { Typography } from "@mui/material";
import React from "react";
import detailsObjectStyle from "./detailsObject.module.css";
interface Props {
  text: string;
}
export const DetailObject = (props: Props) => {
  return (
  <Typography className={detailsObjectStyle.detailsObject}>
    {props.text}
    </Typography>);
}
