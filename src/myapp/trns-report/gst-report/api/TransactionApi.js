import api from '../../../../shared/BaseApi';
import { productName } from '../../../../utils/productName';

export function fetchTransactions({ fromDate, toDate, page, perPage, search, filters = {} }) {
  // remove empty filters
  const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''));

  return api.post('/statement/all', {
    from_date: fromDate,
    to_date: toDate,
    page,
    per_page: perPage,
    settlement_type: 'all',

    ...(search ? { search } : {}),
    ...cleanFilters
  });
}

export const handleExportAllTxnReport = async (params = {}) => {
  const { fromDate, toDate, page = 1, perPage = 25, search, filters = {} } = params;

  try {
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''));

    const res = await api.post(
      '/statement/all',
      {
        from_date: fromDate,
        to_date: toDate,
        page,
        per_page: perPage,
        ...(search ? { search } : {}),
        ...cleanFilters,
        export: 1,
        settlement_type: 'all'
      },
      {
        responseType: 'blob'
      }
    );
    // const updatedCsv = res.data.replace(
    //     /\b(dmt|payu-education|zwitch|easebuzz|mtb|qrmtb|upipayout|bbps|payout|dynamic-qr|paytm_pos|cf_pg5|nixapremium2|premiumpg3|diamondpg1|diamondpg2|diamondpg3)\b/g,
    //     (match) => productName(match)
    //   );

  // Convert Blob -> Text
const csvText = await res.data.text();

const lines = csvText.split(/\r?\n/);

if (lines.length > 1) {
  const headers = lines[0].split(",");

  const txnIndex = headers.findIndex(
    (h) => h.replace(/"/g, "").trim() === "TXN ID"
  );

  const utrIndex = headers.findIndex(
    (h) => h.replace(/"/g, "").trim() === "UTR"
  );

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;

    const cols = lines[i].split(",");

    if (txnIndex !== -1 && cols[txnIndex]) {
      const txn = cols[txnIndex].replace(/"/g, "");
      cols[txnIndex] = `'${txn}'`;
    }

    if (utrIndex !== -1 && cols[utrIndex]) {
      const utr = cols[utrIndex].replace(/"/g, "");
      cols[utrIndex] = `'${utr}'`;
    }

    lines[i] = cols.join(",");
  }
}

const updatedCsv = lines.join("\n");
const blob = new Blob([updatedCsv], {
  type: "text/csv;charset=utf-8;",
});

const url = URL.createObjectURL(blob);
    // 🔥 create link
    const link = document.createElement('a');
    link.href = url;

    // 🔥 FORCE DOWNLOAD
    link.setAttribute('download', `Transactions-Report.csv`);

    // 🔥 MUST append to DOM
    document.body.appendChild(link);

    // 🔥 trigger
    link.click();

    // cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // toast.success("Report exported successfully");
  } catch (err) {
    console.error('Export failed', err);
  }
};
