import { Skeleton, TableCell, TableRow } from "@mui/material";

/**
 * Renders N placeholder rows while data is loading.
 * Pure component — no state, no side effects.
 *
 * @param {{ columns: object[], count?: number }} props
 */
const SkeletonRows = ({ columns, count = 5 }) =>
  Array.from({ length: count }).map((_, i) => (
    <TableRow key={i}>
      {columns.map((col) => (
        <TableCell key={col.field}>
          <Skeleton variant="text" width="80%" />
        </TableCell>
      ))}
    </TableRow>
  ));

export default SkeletonRows;