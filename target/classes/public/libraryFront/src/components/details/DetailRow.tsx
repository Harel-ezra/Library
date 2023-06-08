import { IconButton, TableCell, TableRow } from "@mui/material";
import { DeleteButton } from "../icons/Icons";
import itemsStyle from "./../items/items.module.css";
import { Book, User, Author, Bar } from "../../globalTypes/globalTypes";
interface Props {
  item: Book | User | Author;
  index: number;
  //   onClick: (bar: Bar, id: string, name: string) => void;
  selectedBar: Bar;
  removeObject: (id: string, bar: Bar) => void;
}
export const DetailRow = (props: Props) => {
  const DeleteObject = () => {
    props.removeObject(props.item.id, props.selectedBar);
  };

  return (
    <TableRow className={itemsStyle.row}>
      <TableCell>{props.index}</TableCell>
      <TableCell>{props.item.name}</TableCell>
      {props.selectedBar != "books" && (
        <TableCell>
          <IconButton>
            <DeleteButton onClick={DeleteObject} />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};
