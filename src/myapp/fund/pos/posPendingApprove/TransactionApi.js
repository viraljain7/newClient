import api from '../../../../shared/BaseApi';

export function fetchTransactions({ fromDate, toDate, page, perPage, search, filters = {} }) {
  // remove empty filters
  const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''));

  return api.post('/statement/pos', {
    from_date: fromDate,
    to_date: toDate,
    page,
    limit: perPage,
    ...cleanFilters
  });
}

export const handleExportAllTxnReport = async (params = {}) => {};

export const handleApproveReject = async (form) => {
  const formData = new FormData();

  formData.append('id', form.id);
  if (form.reason) {
    formData.append('reason', form.reason);
  }
  const res = await api.post(`/admin/pos/${form.type}`, formData);

  return res.data;
};
