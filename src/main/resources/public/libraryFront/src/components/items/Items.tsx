import { Box, Table, TableBody, TableContainer } from "@mui/material";
import itemsStyle from "./items.module.css";
import {
  Objects,
  Book,
  User,
  Author,
  Bar,
} from "../../globalTypes/globalTypes";

import { TableHeader } from "./TableHeader";
import { Row } from "./Row";
import { AddObjectDialog } from "../dialog/AddObjectDialog";

interface Props {
  objects: Objects;
  handleObjectInfo: (bar: Bar, id: string, name: string) => void;
  bar: Bar;
  addObject: (name: string, bar: Bar) => void;
  removeObject: (id: string, bar: Bar) => void;
  renameObject: (id: string, bar: Bar, newName: string) => void;
}
export const Items = (props: Props) => {
  return (
    <Box className={itemsStyle.itemsBox}>
      {props.bar === "users" && (
        <AddObjectDialog
          addType="משתמש"
          addAction={props.addObject}
          bar={props.bar}
        />
      )}
      {props.bar === "authors" && (
        <AddObjectDialog addType="סופר" addAction={props.addObject} bar={props.bar} />
      )}
      {props.bar != "none" && (
        <TableContainer>
          <Table>
            <TableHeader />
            <TableBody>
              {props.objects.map(
                (item: Book | User | Author, index: number) => (
                  <Row
                    item={item}
                    index={index}
                    onClick={props.handleObjectInfo}
                    selectedBar={props.bar}
                    removeAction={props.removeObject}
                    renameAction={props.renameObject}
                  />
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
