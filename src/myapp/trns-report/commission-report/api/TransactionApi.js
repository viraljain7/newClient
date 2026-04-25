import api from '../../../../shared/BaseApi';
import { productName } from '../../../../utils/productName';

export function fetchTransactions({ fromDate, toDate, page, perPage, search, filters = {} }) {
  // remove empty filters
  const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''));

  return api.post('/statement/commission', {
    
    from_date: fromDate,
    to_date: toDate,

  });
}

export const handleExportAllTxnReport = async (params = {}) => {

};
