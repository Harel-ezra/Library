import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableCell,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import { EditButton, DeleteButton } from "components/icons/Icons";
import dialogStyle from "components/dialog/dialog.module.css";
import { EntityType } from "src/globalTypes/EntityType";
import { Entity } from "src/globalTypes/Entity";
import { StoreState } from "src/store";

interface Props {
  entity: Entity;
  index: number;
  onClick: (entityType: EntityType, id: string, name: string) => void;
  entityType: EntityType;
  removeEntity: (id: string, entityType: EntityType) => void;
  renameEntity: (id: string, entityType: EntityType, newName: string) => void;
  selectedEntity: boolean;
}

export const Row = (props: Props) => {
  const [name, setName] = useState(props.entity.name);
  const [open, setOpen] = useState(false);
  const userId = useSelector((store: StoreState) => store.user.id);
  const isDarkTheme = useTheme().palette.mode === "dark";

  const clickedRow = () => {
    props.onClick(props.entityType, props.entity.id, props.entity.name);
  };
  const handleRemoveButton = () => {
    props.removeEntity(props.entity.id, props.entityType);
  };
  const handleEditNameButton = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setName(props.entity.name);
    setOpen(false);
  };
  const editNameDone = () => {
    setOpen(false);
    props.renameEntity(props.entity.id, props.entityType, name);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <>
      <ButtonBase component={TableRow}
        onClick={clickedRow}
        sx={{
          bgcolor: props.selectedEntity
            ? isDarkTheme
              ? "primary.dark"
              : "primary.light"
            : "initial",
          display: "table-row",
          ":hover": {
            bgcolor: isDarkTheme ? "primary.dark" : "primary.light",
          },
        }}
      >
        <TableCell>{props.index}</TableCell>
        <TableCell sx={{ width: "100%" }}>{props.entity.name}</TableCell>

        <TableCell
          onClick={(e) => e.stopPropagation()}
          className={dialogStyle.iconCell}
        >
          <EditButton onClick={handleEditNameButton} />
          {props.entityType !== "Book" && userId !== props.entity.id && (
            <DeleteButton onClick={handleRemoveButton} />
          )}
        </TableCell>
      </ButtonBase>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle className={dialogStyle.DialogTitle}>שנה שם </DialogTitle>
        <DialogContent className={dialogStyle.dilogContent}>
          <TextField
            label="שם"
            value={name}
            className={dialogStyle.text}
            onChange={onInputChange}
            onKeyDown={(key) => {
              if (key.key == "Enter") {
                editNameDone();
                key.preventDefault();
              }
            }}
          />
        </DialogContent>
        <DialogActions className={dialogStyle.dilogAction}>
          <Button onClick={handleCloseDialog}>בטל</Button>
          <Button onClick={editNameDone}>בוצע</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
