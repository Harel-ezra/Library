import Button from "@mui/material/Button";
import LoginButtonStyle from "./LoginButton.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";

interface Props {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const LoginButton = (props: Props) => (
  <Button
    onClick={props.onClick}
    className={LoginButtonStyle.LoginButton}
    variant="contained"
  >
    <Typography className={LoginButtonStyle.text} >
      {props.text}
    </Typography>
    <LogoutIcon />
  </Button>
);
export default LoginButton;
