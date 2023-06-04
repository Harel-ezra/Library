import { IconButton, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, ChangeEvent } from "react";
import Swal from "sweetalert2";

export const AddBookDialog = () => {
  const [bookName, setBookName] = useState<string>("");

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBookName(event.target.value);
  };
  const addBook = () => {
    if (bookName == "") {
      Swal.fire({
        title: "שגיאה!",
        text: "לא ניתן להוסיף משימה ריקה",
        icon: "error",
        confirmButtonText: "חזרה",
      });
    } else {
      setBookName("");
    }
  };

  return (
    <TextField 
      value={bookName}
      label="הוסף ספר"
      onChange={onInputChange}
      onKeyDown={(key) => {
        if (key.key == "Enter") {
          addBook();
          key.preventDefault();
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={addBook}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
