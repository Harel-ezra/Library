import { useState } from "react";
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
import dialogStyle from "./dialog.module.css";
import AddCardIcon from "@mui/icons-material/AddCard";
import Swal from "sweetalert2";
import { Book } from "src/globalTypes/Book";
import { getEntities } from "src/serverRequest/requests";
interface Props {
  userId: string;
  addReadiedBook: (userId: string, bookId: string) => void;
}

export const AddBookButton = (props: Props) => {
  const [book, setBook] = useState<Book>();
  const [open, setOpen] = useState(false);
  const [booksList, setBooksList] = useState<Book[]>([]);

  const handleOpenDialog = () => {
    setOpen(true);
    getEntities("Book").then((res) => setBooksList(res));
  };

  const handleCloseDialog = () => {
    setBook({
      id: "",
      name: "",
      authorId: "",
    });    setOpen(false);
  };
  const addReadiedBook = () => {
    if (!booksList.some((bookLst) => bookLst.id === book!.id)) {
      Swal.fire({
        title: "שגיאה!",
        text: "  לא ניתן להוסיף ספר שלא קיים",
        icon: "error",
        confirmButtonText: "חזרה",
      });
    } else {
      props.addReadiedBook(props.userId, book!.id);
    }
    handleCloseDialog();
  };

  return (
    <>
      <Button className={dialogStyle.AddBookDialog} onClick={handleOpenDialog}>
        <Typography className={dialogStyle.buttonText}>הוסף ספר</Typography>
        <AddCardIcon />
      </Button>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{ className: dialogStyle.dialog }}
      >
        <DialogTitle className={dialogStyle.DialogTitle}>הוסף ספר</DialogTitle>
        <DialogContent className={dialogStyle.paddingTop} >
          <Autocomplete
            options={booksList.map((book: Book) => ({
              book: book,
              label: book.name,
            }))}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="בחר ספר"
                inputProps={{
                  ...params.inputProps,
                }}
                onKeyPress={(e) => {
                  if (e?.key === "Enter") {
                    e.preventDefault();
                    addReadiedBook();
                  }
                }}
              />
            )}
            noOptionsText={"אין ספרים לבחירה"}
            onInputChange={() => {
              setBook(undefined);
            }}
            onChange={(_e, value) => {
              if (value != null) setBook(value.book);
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
