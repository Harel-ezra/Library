import { Box, List } from "@mui/material"
import detailsStyle from "./details.module.css"
import { DetailObject } from "./DetailObject";
import { AddBookDialog } from "./AddBookDialog";
export const Details=()=>
{
    const booksList = ["שלום", "שבת", "אורחת"];
    return(
        <Box className={detailsStyle.detailsBox}>
            <AddBookDialog/>
            <List>
                {
                    booksList.map(detail=>
                        (
                            <DetailObject text={detail}></DetailObject>
                        ))
                }
            </List>
        </Box>
    )
}