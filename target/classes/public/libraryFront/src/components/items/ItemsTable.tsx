import { Box, Table, TableBody, TableContainer } from "@mui/material";
import itemsStyle from "./items.module.css";
import { EntityType } from "src/globalTypes/EntityType";
import { SimpleObject } from "src/globalTypes/SimpleObject";
import { AddObjectDialog } from "components/dialog/AddObjectDialog";

import { TableHeader } from "./TableHeader";
import { Row } from "./Row";

interface Props {
  entityType?: EntityType;
  entitys: SimpleObject[];
  addEntity: (name: string, entityType: EntityType) => void;
  removeEntity: (id: string, entityType: EntityType) => void;
  renameEntity: (id: string, entityType: EntityType, newName: string) => void;
  selectedEntityDetails: (
    entityType: EntityType,
    id: string,
    name: string
  ) => void;
  selectedEntity?: SimpleObject;
}
export const ItemsTable = (props: Props) => {
  return (
    <Box className={itemsStyle.itemsBox} bgcolor={"background.default"}>
      {/* שים בlibrary.tsx */}
      {(props.entityType === "Author" || props.entityType === "User") && (
        <AddObjectDialog
          entityTypeText={props.entityType === "Author" ? "סופר" : "משתמש"}
          addAction={props.addEntity}
          entityType={props.entityType}
        />
      )}
      {props.entityType && (
        <TableContainer className={itemsStyle.tableBox}>
          <Table>
            {/* אל תשתמש בזה */}
            {/* <colgroup>
              <col width="10%" />
              <col width="70%" />
              <col width="30%" />
              </colgroup> */}
            {/* תסדר את השורות */}
            <TableHeader />
            <TableBody>
              {props.entitys.map((entity: SimpleObject, index: number) => (
                  <Row
                    key={entity.id}
                    selectedEntity={props.selectedEntity?.id === entity.id}
                    entity={entity}
                    index={index}
                    onClick={props.selectedEntityDetails}
                    entityType={props.entityType!}
                    removeEntity={props.removeEntity}
                    renameEntity={props.renameEntity}
                  />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
