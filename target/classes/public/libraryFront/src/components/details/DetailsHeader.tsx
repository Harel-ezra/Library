import { Box, Typography } from "@mui/material";
import detailsStyle from "./details.module.css";
import { EntityType } from "src/globalTypes/EntityType";
import { AddBookButton } from "components/dialog/AddReadiedDialog";
import { AddObjectDialog } from "components/dialog/AddObjectDialog";
import { StoreState } from "src/store";
import { useSelector } from "react-redux";
import { Entity } from "src/globalTypes/Entity";

interface Props {
  addReadiedBook: (userId: string, bookId: string) => void;
  object: Entity;

  entityType: EntityType;
  addAction: (name: string, entityType: EntityType) => void;
}
export const DetailsHeader = (props: Props) => {
  const userId = useSelector((store: StoreState) => store.user.id);

  return (
    <Box className={detailsStyle.detailsHeader}>
      <Typography className={detailsStyle.text} sx={{ color: "primary.light" }}>
        {props.entityType && `${hedaerText[props.entityType]} ${props.object.name}`}
      </Typography>
      {props.object.id === userId && (
        <AddBookButton
          userId={props.object.id}
          addReadiedBook={props.addReadiedBook}
        />
      )}
      {props.entityType === "Author" && (
        <AddObjectDialog
          entityTypeText="ספר שכתב"
          addAction={(name: string) =>
            props.addAction(name, "Book")
          }
          entityType={props.entityType}
        ></AddObjectDialog>
      )}
    </Box>
  );
};

const hedaerText = {
   User: "הספרים שקרא",
   Book: "הקוראים של הספר",
   Author: "הספרים שכתב",
};
