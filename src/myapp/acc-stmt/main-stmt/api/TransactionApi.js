import api from '../../../../shared/BaseApi';

export function fetchTransactions({ user_id = 181 }) {
  return api.post('/statement/main', {
    user_id
  });
}

export const handleExportAllTxnReport = async (params = {}) => {};
