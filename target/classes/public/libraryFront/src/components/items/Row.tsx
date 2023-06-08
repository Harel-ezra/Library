import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { EditButton, DeleteButton } from "../icons/Icons";
import { Book, User, Author } from "../../globalTypes/globalTypes";
import itemsStyle from "./items.module.css";
import { Bar } from "../../pages/library/Library";
import { ChangeEvent, useState } from "react";
import dialogStyle from "./../dialog/dialog.module.css";
interface Props {
  item: Book | User | Author;
  index: number;
  onClick: (bar: Bar, id: string, name: string) => void;
  selectedBar: Bar;
  removeAction: (id: string, bar: Bar) => void;
  renameAction: (id: string, bar: Bar, newName: string) => void;
}

export const Row = (props: Props) => {
  const [name, setName] = useState(props.item.name);
  const [open, setOpen] = useState(false);

  const clickedRow = () => {
    props.onClick(props.selectedBar, props.item.id, props.item.name);
  };
  const handleRemoveButton = () => {
    props.removeAction(props.item.id, props.selectedBar);
  };
  const handleEditNameButton = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setName(props.item.name);
    setOpen(false);
  };
  const editNameDone=()=>
  {
    setOpen(false);
    props.renameAction(props.item.id,props.selectedBar,name);
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <>
      <TableRow className={itemsStyle.row} onClick={clickedRow}>
        <TableCell>{props.index}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>
          <EditButton onClick={handleEditNameButton} />
        </TableCell>
        <TableCell>
          <DeleteButton onClick={handleRemoveButton} />
        </TableCell>
      </TableRow>
      <Dialog open={open}
        onClose={handleCloseDialog}

      >
        <DialogTitle >
          ערוך 
        </DialogTitle>
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

