import { IconButton, TableCell, TableRow } from "@mui/material";
import { DeleteButton } from "../icons/Icons";
import { EntityType } from "../../globalTypes/EntityType";
import { SimpleObject } from "src/globalTypes/SimpleObject";
import { StarBorder, Star } from "@mui/icons-material";
import detailsStyle from "./details.module.css";
import { useSelector } from "react-redux";
import { StoreState } from "src/store";
interface Props {
  entityDetail: SimpleObject;
  index: number;
  entityType: EntityType;
  removeEntityDetail: (id: string, bar: EntityType) => void;
  updateFavoriteBook: (id: string) => void;
  selectedEntity: SimpleObject;
}
export const DetailRow = (props: Props) => {
  const userId = useSelector((store: StoreState) => store.user?.id);
  const favoriteBook =
    useSelector((store: StoreState) => store.user?.favoriteBookId) ===
    props.entityDetail.id;
  const DeleteObject = () => {
    if (favoriteBook) props.updateFavoriteBook(props.entityDetail.id);
    props.removeEntityDetail(props.entityDetail.id, props.entityType);
  };
  const handleFavoriteBook = () => {
    props.updateFavoriteBook(props.entityDetail.id);
  };
  return (
    <TableRow className={detailsStyle.row}>
      <TableCell>{props.index}</TableCell>
      <TableCell>{props.entityDetail.name}</TableCell>
      {userId === props.selectedEntity.id && (
        <TableCell>
          <IconButton onClick={handleFavoriteBook}>
            {favoriteBook ? (
              <Star sx={{ color: "primary.light" }} />
            ) : (
              <StarBorder sx={{ color: "primary.light" }} />
            )}
          </IconButton>
        </TableCell>
      )}
      {props.selectedEntity.id !== userId &&
        props.entityDetail.id !== props.selectedEntity.id &&
        props.entityType === "User" && (
          <TableCell>
            <Star sx={{ color: "primary.dark" }} />
          </TableCell>
        )}
      {(props.entityType === "Author" ||
        userId === props.selectedEntity.id) && (
        <TableCell>
          <IconButton>
            <DeleteButton onClick={DeleteObject} />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};
