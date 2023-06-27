import { useState } from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import dialogStyle from "./dialog.module.css";
import { LibraryLogo } from "../logo/LibraryLogo";
import { useNavigate } from "react-router-dom";

const LibraryLogoLogOut = () => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Button onClick={handleOpenDialog}>
        <LibraryLogo />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className={dialogStyle.DialogTitle}>
          בטוח שרוצה להתנתק?
        </DialogTitle>
        <DialogActions className={dialogStyle.dilogAction}>
          <Button onClick={() => setOpen(false)}>בטל</Button>
          <Button onClick={handleLogOut}>התנתק</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default LibraryLogoLogOut;
