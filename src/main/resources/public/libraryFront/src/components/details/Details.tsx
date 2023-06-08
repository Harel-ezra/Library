import {
  Box,
  TableBody,
  TableContainer,
} from "@mui/material";
import detailsStyle from "./details.module.css";
import { DetailsHeader } from "./DetailsHeader";
import {
  Author,
  Bar,
  Book,
  Objects,
  User,
} from "./../../globalTypes/globalTypes";
import { TableHeader } from "../items/TableHeader";
import { DetailRow } from "./DetailRow";
interface Props {
  objectInfo: Objects;
  objectId: string;
  objectName: string;
  bar: Bar;
  addReadiedBook: (userId: string, bookId: string) => void;
  addObject: (name: string, bar: Bar) => void;
  removeObject: (id: string, bar: Bar) => void;
}
export const Details = (props: Props) => {
  return (
    <Box className={detailsStyle.detailsBox}>
      {props.objectId != "" && (
        <>
          <DetailsHeader
            bar={props.bar}
            objectId={props.objectId}
            objectName={props.objectName}
            addReadiedBook={props.addReadiedBook}
            addAction={props.addObject}
          />
          <TableContainer>
            <TableHeader />

            <TableBody>
              {props.objectInfo.map(
                (item: Book | User | Author, index: number) => (
                  <DetailRow
                    index={index}
                    item={item}
                    selectedBar={props.bar}
                    removeObject={props.removeObject}
                  />
                )
              )}
            </TableBody>
          </TableContainer>
        </>
      )}
    </Box>
  );
};
