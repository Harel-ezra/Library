import Button from "@mui/material/Button";
import logButtonStyle from "./logButton.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
type Props = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const LogButton = (props: Props) => (
  <Button
    onClick={props.onClick}
    className={logButtonStyle.logButton}
    variant="contained"
  >
    <Typography className={logButtonStyle.text}> {props.text}</Typography>
    <LogoutIcon />
  </Button>
);
export default LogButton;
