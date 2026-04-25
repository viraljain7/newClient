/**
 * Pure utility functions shared across the app.
 * No React, no MUI, no axios — just plain JS.
 */

/**
 * Read a value from a nested object using dot-notation.
 *
 * @example
 *   getNestedValue({ user: { name: "Alice" } }, "user.name") // "Alice"
 *   getNestedValue(row, "amount")                            // row.amount
 *
 * @param {object} obj
 * @param {string} path  Dot-separated key path, e.g. "user.role.name"
 * @returns {*}
 */
export function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

/**
 * Returns a { fromDate, toDate } pair where:
 *   toDate   = today
 *   fromDate = today minus `daysBack` days
 *
 * Both dates are formatted as "YYYY-MM-DD" strings (the format
 * accepted by <input type="date"> and our API).
 *
 * @param {number} daysBack  0 = today only, 7 = last week, etc.
 * @returns {{ fromDate: string, toDate: string }}
 */
export function getDefaultDateRange(daysBack = 0) {
  const pad = (n) => String(n).padStart(2, "0");

  const toD   = new Date();
  const fromD = new Date();
  fromD.setDate(fromD.getDate() - daysBack);

  const fmt = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  return { fromDate: fmt(fromD), toDate: fmt(toD) };
}

/**
 * Formats a number as Indian currency (no symbol).
 *
 * @param {number|string} value
 * @returns {string}  e.g. "1,23,456.00"
 */
export function formatINR(value) {
  return Number(value ?? 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}