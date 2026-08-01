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
    ...cleanFilters,
    product: "fundrequest",
  });
}


export const handleExportAllTxnReport = async (params = {}) => {
  const { fromDate, toDate, page = 1, perPage = 25, search, filters = {
    
  } } = params;

  try {
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''));



    const res = await api.post(
  "/statement/all",
  {
    from_date: fromDate,
    to_date: toDate,
    page,
    per_page: perPage,
    ...(search ? { search } : {}),
    ...cleanFilters,
    export: 1,
    settlement_type: "all",
    product: "fundrequest",
  },
  {
    responseType: "blob",
  }
);

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

const link = document.createElement("a");
link.href = url;
link.download = "Pos-Request-Report.csv";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Export failed', err);
  }
};
