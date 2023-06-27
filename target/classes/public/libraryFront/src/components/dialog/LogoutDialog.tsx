import { useState } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import dialogStyle from "./dialog.module.css";
import LoginButtonStyle from "components/button/LoginButton.module.css";
type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const LogoutDialog = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        className={LoginButtonStyle.LoginButton}
        variant="contained"
      >
        <Typography className={LoginButtonStyle.text}> {props.text}</Typography>
        <LogoutIcon />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle className={dialogStyle.DialogTitle}>בטוח שרוצה להתנתק?</DialogTitle>
        <DialogActions className={dialogStyle.dilogAction}>
          <Button onClick={() => setOpen(false)}>בטל</Button>
          <Button onClick={props.onClick}>התנתק</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default LogoutDialog;
