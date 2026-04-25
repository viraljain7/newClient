/**
 * helpers.js
 * ─────────────────────────────────────────────────────────
 * WHAT:  Pure utility functions used across the app.
 * WHY:   Centralize logic so you never copy-paste the same function.
 *        Pure functions are also very easy to unit test.
 */

/**
 * Safely read a nested object value by dot-notation path.
 * e.g. getNestedValue({ user: { name: "Jay" } }, "user.name") → "Jay"
 */
export function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

/**
 * Format a number as Indian Rupees.
 * e.g. formatCurrency(1234.5) → "₹1,234.50"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

/**
 * Format an ISO date string for display.
 * e.g. formatDate("2026-04-01T10:00:00") → "01 Apr 2026, 10:00 AM"
 */
export function formatDate(dateString) {
  if (!dateString) return "-";
//   return new Intl.DateTimeFormat("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(new Date(dateString));


  return dateString
}

/**
 * Get today's date and a date N days ago as "YYYY-MM-DD" strings.
 * Useful for default date range pickers.
 */
export function getDefaultDateRange(daysBack = 7) {
  const today = new Date();
  const from  = new Date(today);
  from.setDate(from.getDate() - daysBack);

  const fmt = (d) => d.toISOString().split("T")[0];
  return { fromDate: fmt(from), toDate: fmt(today) };
}