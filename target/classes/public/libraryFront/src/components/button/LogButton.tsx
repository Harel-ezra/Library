import Button from "@mui/material/Button";
import logButtonStyle from './logButton.module.css'

type Props=
{
  text:string,
  onClick:React.MouseEventHandler<HTMLButtonElement>,
}
const LogButton = (props:Props) =>( 
  <Button onClick={props.onClick}
  className={logButtonStyle.logButton}
  variant="contained"
  
  >{props.text}</Button>
)
export default LogButton;
