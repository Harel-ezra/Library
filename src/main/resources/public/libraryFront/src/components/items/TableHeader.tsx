import { TableHead, TableRow, TableCell } from "@mui/material";

export const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>מזהה</TableCell>
      <TableCell colSpan={3}>שם</TableCell>
    </TableRow>
  </TableHead>
);
