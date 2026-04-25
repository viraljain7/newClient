
import { useEffect, useState } from "react";
import { fetchTransactions } from "./TransactionApi";
import { DEFAULT_PER_PAGE } from "../../../../shared/Constants";

export function useTransactions({
  fromDate,
  toDate,
  initialPerPage = DEFAULT_PER_PAGE,
  search: initialSearch = "",
  filters: initialFilters = {}
}) {

  // -------------------- STATE --------------------
  const [rows, setRows] = useState([]);
  const [footerRows, setFooterRows] = useState([]);

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
      
      });

      const body = res.data;


      // set table data
      setRows(body?.data || []);
      setFooterRows(body?.summary||[])
      // set pagination
      setPagination({
        currentPage: body.current_page,
        lastPage: body.total_pages,
        perPage,
        total: body.total
      });

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err.message ||
        "Failed to load transactions"
      );
    } finally {
      setLoading(false);
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
  setFilters({});   // clear all filters
  setSearch("");    // clear search
  setPage(1); 
  setPerPage(initialPerPage);
        // go to first page
};

  // -------------------- RETURN --------------------
  return {
    rows,
    footerRows,
    
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




