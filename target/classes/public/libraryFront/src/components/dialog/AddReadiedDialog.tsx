import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";
import AddCardIcon from "@mui/icons-material/AddCard";
import dialogStyle from "./dialog.module.css";
import { Book, Object } from "../../globalTypes/globalTypes";
import { getAllBooksAxios } from "../../serverRequest/request";
interface Props {
  userId: string;
  addReadiedBook: (userId: string, bookId: string) => void;
}

export const AddBookButton = (props: Props) => {
  const [bookName, setBookName] = useState<string>("");
  const [bookId, setBookId] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  const handleOpenDialog = () => {
    setOpen(true);
    getAllBooksAxios().then((res) => setBooks(res));
  };

  const handleCloseDialog = () => {
    setBookName("");
    setOpen(false);
  };
  const addReadiedBook = () => {
    if (bookName == "") {
      Swal.fire({
        title: "שגיאה!",
        text: "לא ניתן להוסיף ספר ריק",
        icon: "error",
        confirmButtonText: "חזרה",
      });
    } else {
      props.addReadiedBook(props.userId, bookId);
    }
    handleCloseDialog();
  };

  return (
    <>
      <Button className={dialogStyle.AddBookDialog} onClick={handleOpenDialog}>
        <Typography className={dialogStyle.AddBookDialogText}>
          הוסף ספר
        </Typography>
        <AddCardIcon />
      </Button>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{ className: dialogStyle.dialog }}
      >
        <DialogTitle className={dialogStyle.DialogTitle}>הוסף ספר</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={books.map((book: Book) => book.name)}
            renderInput={(params) => <TextField {...params} label="בחר ספר" />}
            inputValue={bookName}
            onInputChange={(event, newInputValue) => {
              setBookName(newInputValue);
              setBookId(
                books.find((book) => book.name === newInputValue)?.id ?? "0"
              );
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addReadiedBook();
                event.preventDefault();
              }
            }}
          ></Autocomplete>
        </DialogContent>
        <DialogActions className={dialogStyle.dilogAction}>
          <Button onClick={handleCloseDialog}>בטל</Button>
          <Button onClick={addReadiedBook}>אישור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
