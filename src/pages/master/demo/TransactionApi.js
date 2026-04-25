/**
 * transactionApi.js
 * ─────────────────────────────────────────────────────────
 * WHAT:  All transaction-related API calls live here.
 * WHY:   Components should NOT know about URLs or HTTP verbs.
 *        They just call fetchTransactions() and get data back.
 *        If the endpoint changes, only THIS file needs updating.
 */

import { request } from "./Apiclient";



export async function fetchTransactions({
  page = 1,
  perPage = 100,
  fromDate,
  toDate,
} = {}) {
  return request("/statement/all", {
    method: "POST",
    body: JSON.stringify({
      page,
      per_page: perPage,
      from_date: fromDate,
      to_date: toDate,
    }),
  });
}

// ── Add more transaction functions here as your app grows ──
// export async function exportTransactions(params) { ... }
// export async function getTransactionById(id) { ... }