import { TableCell, TableRow } from "@mui/material";
import { EditButton, DeleteButton } from "../icons/Icons";
import { Book, User, Author } from "../../globalTypes/globalTypes";
import itemsStyle from "./items.module.css";
import { Bar } from "../../pages/library/Library";
interface Props {
  item: Book | User | Author;
  index: number;
  
}

export const Row = (props: Props) => {
  

  return (
    <TableRow className={itemsStyle.row}>
      <TableCell>{props.index}</TableCell>
      <TableCell>{props.item.name}</TableCell>
    </TableRow>
  );
};
