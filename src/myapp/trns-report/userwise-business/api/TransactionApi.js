import api from '../../../../shared/BaseApi';
import { productName } from '../../../../utils/productName';

export function fetchTransactions({ fromDate, toDate, page, perPage, search, filters = {} }) {
  // remove empty filters

  return api.post('/statement/service-report', {
    from: fromDate,
    to: toDate,
    role: 'RT'
  });
}
export const handleExportAllTxnReport = async ({ fromDate, toDate }) => {
  try {
    const { data } = await api.post('/statement/service-report', {
      from: fromDate,
      to: toDate,
      role: 'RT'
    });

    const rows = [...data.data, data.summary];

    if (!rows.length) return;

    // Get headers
    const headers = Object.keys(rows[0]);

    // Create CSV
    const csv = [
      headers.join(','),
      ...rows.map((row) => headers.map((key) => `"${String(row[key] ?? '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Userwise-Business-Report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};
