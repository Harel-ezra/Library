import { ListItem, Typography } from "@mui/material";
import itemsObjectStyle from "./ItemsObjectStyle.module.css";
import { DeleteButton, EditButton } from "../icons/Icons";
interface Props {
  text: string;
}
export const ItemObject = (props: Props) => {
  return (
    <ListItem className={itemsObjectStyle.itemObject}>
      <Typography>{props.text}</Typography>
      
      <EditButton onClick={()=>{return}} />
      <DeleteButton onClick={()=>{return}} />
    </ListItem>
  );
};
