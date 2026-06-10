import api from '../../../../shared/BaseApi';

export function fetchTransactions({ user_id  }) {
  return api.post('/statement/main', {
    user_id,
    settlement_type: 't1'
  });
}

export const handleExportAllTxnReport = async (params = {}) => {};
