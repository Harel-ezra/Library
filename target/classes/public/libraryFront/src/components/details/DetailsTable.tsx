import { Box, TableBody, TableContainer, Typography } from "@mui/material";
import detailsStyle from "./details.module.css";
import { DetailsHeader } from "./DetailsHeader";
import { EntityType } from "src/globalTypes/EntityType";
import { SimpleObject } from "src/globalTypes/SimpleObject";
import { TableHeader } from "components/items/TableHeader";
import { DetailRow } from "./DetailRow";
import {
  updateFavoriteBookAxios,
} from "src/serverRequest/requests";
import { handleFavoriteBook } from "src/pages/library/Library";
import { useDispatch } from "react-redux";
interface Props {
  entityDetails: SimpleObject[];
  selectedEntity?: SimpleObject;
  entityType?: EntityType;
  addReadiedBook: (userId: string, bookId: string) => void;
  addEntityDetail: (name: string, bar: EntityType) => void;
  removeEntityDetail: (id: string, bar: EntityType) => void;
}
export const DetailsTable = (props: Props) => {
  const dispatch = useDispatch();
  const deleteObject = (id: string, bar: EntityType) => {
    props.removeEntityDetail(id, bar);
  };
  const updateFavoriteBook = async (bookId: string) => {
    if (props.selectedEntity) await updateFavoriteBookAxios(props.selectedEntity.id, bookId);
    handleFavoriteBook(props.selectedEntity!.id, dispatch);
  };

  return (
    <Box className={detailsStyle.detailsBox} bgcolor={"background.default"}>
      {props.selectedEntity && (
        <>
          <DetailsHeader
            bar={props.entityType!}
            object={props.selectedEntity}
            addReadiedBook={props.addReadiedBook}
            addAction={props.addEntityDetail}
          />
          {props.entityDetails.length === 0 ? (
            <Typography
              className={detailsStyle.noDataMessage}
              sx={{ color: "primary.main" }}
            >
              {props.entityType && `${noDataMessage[props.entityType]}`}
            </Typography>
          ) : (
            <TableContainer>
              <colgroup>
                <col width="10%" />
                <col width="20%" />
                {props.entityType !== "Book" && <col width="10%" />}
                {props.entityType === "User" && <col width="10%" />}
              </colgroup>
              <TableHeader />
              <TableBody>
                {props.entityDetails.map((entity: SimpleObject, index: number) => (
                  <DetailRow
                    key={entity.id}
                    index={index}
                    entityDetail={entity}
                    entityType={props.entityType!}
                    removeEntityDetail={deleteObject}
                    updateFavoriteBook={updateFavoriteBook}
                    selectedEntity={props.selectedEntity!}
                  />
                ))}
              </TableBody>
            </TableContainer>
          )}
        </>
      )}
    </Box>
  );
};

const noDataMessage = {
  User: "אין ספרים להצגה",
  Book: "אין משתמשים להצגה",
  Author: "אין ספרים להצגה",
};
