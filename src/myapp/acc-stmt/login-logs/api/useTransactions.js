import { useCallback, useEffect, useState } from 'react';
import { fetchTransactions } from './TransactionApi';
import { DEFAULT_PER_PAGE } from '../../../../shared/Constants';

export function useTransactions({
  fromDate,
  toDate,
  initialPerPage = DEFAULT_PER_PAGE,
  search: initialSearch = '',
  filters: initialFilters = {}
}) {
  // -------------------- STATE --------------------
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPageState] = useState(1);
  const [perPage, setPerPageState] = useState(initialPerPage);
  const [search, setSearchState] = useState(initialSearch);
  const [filters, setFiltersState] = useState(initialFilters);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: initialPerPage,
    total: 0
  });

  // -------------------- FETCH --------------------
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchTransactions({
        from_date: fromDate,
        to_date: toDate,
        page,
        per_page: perPage,
        search,
        ...filters
      });

      // Laravel pagination: res.data.data = { current_page, data[], last_page, total, per_page }
      const body = res.data; // axios wraps in .data
      const meta = body?.data; // Laravel paginator object

      setRows(meta?.data ?? []);

      setPagination({
        currentPage: meta?.current_page ?? 1,
        lastPage: meta?.last_page ?? 1,
        perPage: meta?.per_page ?? perPage,
        total: meta?.total ?? 0
      });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load data');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate, page, perPage, search, filters]);

  // -------------------- AUTO FETCH --------------------
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // -------------------- ACTIONS --------------------
  const handleSetPage = (newPage) => setPageState(newPage);

  const handleSetPerPage = (newPerPage) => {
    setPerPageState(newPerPage);
    setPageState(1);
  };

  const handleSetSearch = (value) => {
    setSearchState(value);
    setPageState(1);
  };

  const handleSetFilters = (newFilters) => {
    setFiltersState(newFilters);
    setPageState(1);
  };

  // refetch = re-run current query, no state reset
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // resetAndRefetch = clear everything back to defaults
  const reset = () => {
    setFiltersState(initialFilters);
    setSearchState(initialSearch);
    setPerPageState(initialPerPage);
    setPageState(1);
  };

  // -------------------- RETURN --------------------
  return {
    rows,
    loading,
    error,
    pagination,
    filters,
    search,

    setPage: handleSetPage,
    setPerPage: handleSetPerPage,
    setSearch: handleSetSearch,
    setFilters: handleSetFilters,
    refetch,
    reset
  };
}
