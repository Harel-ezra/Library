import { Box, List } from "@mui/material";
import itemsStyle from "./items.module.css";
import { TransitionGroup } from "react-transition-group";
import { ItemObject } from "./ItemObject";
import { ItemsList, Book, User, Author } from "../../globalTypes/globalTypes";

interface Props {
  itemsList: ItemsList;
}
export const Items = (props: Props) => {
  // const booksList = ["שלום", "שבת", "אורחת"];
  return (
    <Box className={itemsStyle.itemsBox}>
      <List>
        <TransitionGroup>
          {props.itemsList.map((item: Book | User | Author) => (
            <ItemObject text={item.name}></ItemObject>
          ))}
        </TransitionGroup>
      </List>
    </Box>
  );
};
