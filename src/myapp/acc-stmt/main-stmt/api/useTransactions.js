import { useEffect, useState } from 'react';
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

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);

  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState(initialFilters);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: initialPerPage,
    total: 0
  });

  // -------------------- FETCH FUNCTION --------------------
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchTransactions({
        fromDate,
        toDate,
        page,
        perPage,
        search,
        filters
      });

      const body = res.data;

      // set table data
      setRows(body?.data || []);
      const vtotal = body?.data?.length || 0;
      const vperPage = 10; // or your default

      setPagination({
        currentPage: 1,
        perPage,
        total: vtotal,
        lastPage: Math.ceil(vtotal / vperPage)
      });
      // set pagination
      // setPagination({
      //   currentPage:1,
      //   lastPage:10,
      //   perPage:1,
      //   total:25
      // });
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);

      console.log('aaaa', error);
    }
  };

  // -------------------- AUTO FETCH --------------------
  useEffect(() => {
    fetchData();
  }, [page, perPage, search, filters, fromDate, toDate]);

  // -------------------- ACTIONS --------------------

  // change page
  const handleSetPage = (newPage) => {
    setPage(newPage);
  };

  // change rows per page
  const handleSetPerPage = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  // search
  const handleSetSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  // filters
  const handleSetFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  // manual refresh
  // const refetch = () => {
  //   fetchData();
  // };

  const refetch = () => {
    setFilters({}); // clear all filters
    setSearch(''); // clear search
    setPage(1);
    setPerPage(initialPerPage);
    // go to first page
  };

  // -------------------- RETURN --------------------
  return {
    rows,
    loading,
    error,
    pagination,

    setPage: handleSetPage,
    setPerPage: handleSetPerPage,
    setSearch: handleSetSearch,
    setFilters: handleSetFilters,
    refetch,

    filters,
    search
  };
}
