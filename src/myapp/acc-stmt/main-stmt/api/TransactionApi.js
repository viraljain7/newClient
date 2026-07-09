import api from '../../../../shared/BaseApi';

export function fetchTransactions({ user_id, page, per_page, date_from, date_to }) {
  return api.post('/statement/main', {
    user_id,
    settlement_type: 'instant',
    page,
    per_page,
    date_from,
    date_to

  });
}

export const handleExportAllTxnReport = async (params = {}) => {};
