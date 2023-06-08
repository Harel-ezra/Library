import { Box, Typography } from "@mui/material";
import { AddBookButton } from "../dialog/AddReadiedDialog";
import detailsStyle from "./details.module.css";
import { Bar } from "../../globalTypes/globalTypes";
import { Object } from "../../globalTypes/globalTypes";
import { AddObjectDialog } from "../dialog/AddObjectDialog";

interface Props {
  // header:string,
  addReadiedBook: (userId: string, bookId: string) => void;
  objectId: string;
  objectName: string;
  bar: Bar;
  addAction: (name: string, bar: Bar) => void;
}
export const DetailsHeader = (props: Props) => {
  return (
    <Box className={detailsStyle.detailsHeader}>
      <Typography className={detailsStyle.text}>
        {props.bar === "users" && `הספרים שקרא ${props.objectName}`}
        {props.bar === "books" && `הקוראים של הספר ${props.objectName}`}
        {props.bar === "authors" && `הספרים שכתב ${props.objectName}`}
      </Typography>
      {props.bar === "users" && (
        <AddBookButton
          userId={props.objectId}
          addReadiedBook={props.addReadiedBook}
        />
      )}
      {props.bar === "authors" && (
        <AddObjectDialog
          addType="ספר שכתב"
          addAction={(name: string, bar: Bar)=>props.addAction(name,"books")}
          bar={props.bar}
        ></AddObjectDialog>
      )}
    </Box>
  );
};
