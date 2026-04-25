/**
 * App-wide constants.
 * Import individual exports — never import the whole file.
 *
 * Usage:
 *   import { ROWS_PER_PAGE_OPTIONS } from "@/shared/Constants";
 */

/** Options shown in every table's "rows per page" dropdown. */
export const ROWS_PER_PAGE_OPTIONS = [50, 250, 500, 1000];

/** Default number of rows per page on first load. */
export const DEFAULT_PER_PAGE = ROWS_PER_PAGE_OPTIONS[0];

/** Date format used by the API (YYYY-MM-DD). */
export const API_DATE_FORMAT = "YYYY-MM-DD";

export const colorMap = {
  success: {
    bg: "#E6F4EA",
    text: "#34A853",
  },
  failed: {
    bg: "#FDE8E8",
    text: "#D93025",
  },
  pending: {
    bg: "#FFF4E5",
    text: "#F29900",
  },
  refunded: {
    bg: "#EFE7FB",
    text: "#7E57C2",
  },
};