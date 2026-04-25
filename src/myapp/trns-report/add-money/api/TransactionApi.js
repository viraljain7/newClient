import api from '../../../../shared/BaseApi';
import { productName } from '../../../../utils/productName';

export function fetchTransactions({ fromDate, toDate, page, perPage, search, filters = {} }) {
  // remove empty filters
  const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''));

  return api.post('/service/payin/payu-education/report', {
    type: 'report',
    from_date: fromDate,
    to_date: toDate,
    page,
    per_page: perPage,
    ...(search ? { search } : {}),
    ...cleanFilters
  });
}

export const handleExportAllTxnReport = async (params = {}) => {
  const { fromDate, toDate, page = 1, perPage = 25, search, filters = {} } = params;

  try {
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''));

    const res = await api.post(
      '/service/payin/payu-education/report',
      {
        type: 'report',
        from_date: fromDate,
        to_date: toDate,
        page,
        per_page: perPage,
        ...(search ? { search } : {}),
        ...cleanFilters,
        export: 1
      },
      {
        responseType: 'blob'
      }
    );
    // const updatedCsv = res.data.replace(
    //     /\b(dmt|payu-education|zwitch|easebuzz|mtb|qrmtb|upipayout|bbps|payout|dynamic-qr|paytm_pos|cf_pg5|nixapremium2|premiumpg3|diamondpg1|diamondpg2|diamondpg3)\b/g,
    //     (match) => productName(match)
    //   );

    // 🔥 IMPORTANT: use response directly
    const blob = new Blob([res.data]);

    // 🔥 create URL
    const url = window.URL.createObjectURL(blob);

    // 🔥 create link
    const link = document.createElement('a');
    link.href = url;

    // 🔥 FORCE DOWNLOAD
    link.setAttribute('download', `Add-Money-Report.csv`);

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
