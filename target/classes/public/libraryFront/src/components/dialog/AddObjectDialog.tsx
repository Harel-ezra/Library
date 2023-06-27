import { ChangeEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import dialogStyle from "./dialog.module.css";
import { EntityType } from "src/globalTypes/EntityType";
import Swal from "sweetalert2";
interface Props {
  entityTypeText: string;
  addAction: (name: string, bar: EntityType) => void;
  entityType: EntityType;
}
export const AddObjectDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCloseDialog = () => {
    setName("");
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const addName = () => {
    if (name == "") {
      Swal.fire({
        title: "שגיאה!",
        text: "הכנס שם",
        icon: "error",
        confirmButtonText: "חזרה",
      });
    } else {
      props.addAction(name, props.entityType);
    }
    handleCloseDialog();
  };

  return (
    <>
      <Button className={dialogStyle.dialogButton} onClick={handleOpenDialog}>
        <Typography className={dialogStyle.buttonText}>
          הוסף {props.entityTypeText}
        </Typography>
        <AddCardIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{ className: dialogStyle.dialog }}
      >
        <DialogTitle className={dialogStyle.DialogTitle}>
          הוספת {props.entityTypeText}
        </DialogTitle>
        <DialogContent className={dialogStyle.dilogContent}>
          <TextField
            label="שם"
            value={name}
            className={dialogStyle.text}
            onChange={onInputChange}
            onKeyDown={(key) => {
              if (key.key == "Enter") {
                addName();
                key.preventDefault();
              }
            }}
          />
        </DialogContent>
        <DialogActions className={dialogStyle.dilogAction}>
          <Button onClick={handleCloseDialog}>בטל</Button>
          <Button onClick={addName}>אישור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
