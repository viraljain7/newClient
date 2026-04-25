/**
 * constants.js
 * ─────────────────────────────────────────────────────────
 * WHAT:  App-wide constants — things that are fixed values, not logic.
 * WHY:   Changing "success" to "SUCCESS" in one place is much safer than
 *        hunting through 20 files for every string comparison.
 */

// Transaction status values exactly as returned by your API
export const TRANSACTION_STATUS = {
  SUCCESS:    "success",
  PENDING:    "pending",
  FAILED:     "failed",
  REFUNDED:   "refunded",
  PROCESSING: "processing",
};

// Map status → MUI Chip color
export const STATUS_COLOR_MAP = {
  [TRANSACTION_STATUS.SUCCESS]:    "success",
  [TRANSACTION_STATUS.PENDING]:    "warning",
  [TRANSACTION_STATUS.FAILED]:     "error",
  [TRANSACTION_STATUS.REFUNDED]:   "info",
  [TRANSACTION_STATUS.PROCESSING]: "default",
};

// Rows-per-page options used across all tables
export const ROWS_PER_PAGE_OPTIONS = [50, 250, 500, 1000];