import { useEffect, useState, useMemo } from "react";
import { fetchTRreport } from "./fundApi.js";
import { DEFAULT_PER_PAGE } from "../../../shared/Constants.js";

const useFundTR = ({
  initialPerPage = DEFAULT_PER_PAGE,
  search: initialSearch = "",
  filters: initialFilters = {},
} = {}) => {
  // -------------------- STATE --------------------
  const [allData, setAllData] = useState([]); // full data (important)
  const [rows, setRows] = useState([]); // paginated data

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
    total: 0,
  });

  // -------------------- FETCH --------------------
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchTRreport();

      const data = res?.data || res || [];

      setAllData(data);
    } catch (err) {
      setError(err?.message || "Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- FILTER + SEARCH (CLIENT SIDE) --------------------
  const processedData = useMemo(() => {
    let temp = [...allData];

    // 🔍 Search
    if (search) {
      const lower = search.toLowerCase();
      temp = temp.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(lower)
      );
    }

    // 🎯 Filters
    Object.keys(filters || {}).forEach((key) => {
      if (filters[key]) {
        temp = temp.filter((item) => item[key] === filters[key]);
      }
    });

    return temp;
  }, [allData, search, filters]);

  // -------------------- PAGINATION (CLIENT SIDE) --------------------
  useEffect(() => {
    const total = processedData.length;
    const lastPage = Math.ceil(total / perPage) || 1;

    const start = (page - 1) * perPage;
    const end = start + perPage;

    const paginatedRows = processedData.slice(start, end);

    setRows(paginatedRows);

    setPagination({
      currentPage: page,
      lastPage,
      perPage,
      total,
    });
  }, [processedData, page, perPage]);

  // -------------------- AUTO FETCH --------------------
  useEffect(() => {
    fetchData();
  }, []);

  // -------------------- ACTIONS --------------------
  const handleSetPage = (newPage) => setPage(newPage);

  const handleSetPerPage = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  const handleSetSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSetFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const refetch = () => {
    fetchData();
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
    search,


    trReport:allData
  };
};

export default useFundTR;