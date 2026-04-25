import { useMemo, useState } from "react";
import { getNestedValue } from "../../shared/Helper";


export function useTableState({ rows, columns, rowsPerPageOptions, isServerSide }) {
  const [page, setPage]           = useState(0);           // MUI 0-based
  const [perPage, setPerPage]     = useState(rowsPerPageOptions[0]);
  const [search, setSearch]       = useState("");
  const [filters, setFilters]     = useState({});
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir]     = useState("asc");       // "asc" | "desc"

  // Derived column groups — stable references via useMemo
  const searchableColumns = useMemo(() => columns.filter((c) => c.searchable),  [columns]);
  const filterableColumns = useMemo(() => columns.filter((c) => c.filter),      [columns]);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleSearch = (value) => {
    setSearch(value);
    if (!isServerSide) setPage(0);
  };

  const handleSortToggle = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
    if (!isServerSide) setPage(0);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    if (!isServerSide) setPage(0);
  };

  const clearFilters = () => {
    setFilters({});
    setSearch("");
    if (!isServerSide) setPage(0);
  };

  // ── Client-side filtering ────────────────────────────────────────────────────
  // Memoised so it only recalculates when its dependencies actually change.

  const matchesRow = (row) => {
    const matchesSearch =
      !search ||
      searchableColumns.some((col) =>
        String(getNestedValue(row, col.field) ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    const matchesFilters = columns.every((col) => {
      if (!col.filter) return true;
      const fv = filters[col.field];
      if (fv == null || fv === "") return true;
      return String(getNestedValue(row, col.field) ?? "")
        .toLowerCase()
        .includes(String(fv).toLowerCase());
    });

    return matchesSearch && matchesFilters;
  };

  const filteredCount = useMemo(() => {
    if (isServerSide) return 0;
    return rows.filter(matchesRow).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, search, filters, isServerSide]);

  const displayRows = useMemo(() => {
    if (isServerSide) return rows;                          // server already filtered

    const filtered = rows.filter(matchesRow);
    const sorted   = applySorting(filtered, sortField, sortDir);
    const start    = page * perPage;
    return sorted.slice(start, start + perPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, search, filters, sortField, sortDir, page, perPage, isServerSide]);

  return {
    // Raw state (needed by SmartTable for pagination wiring)
    page, setPage,
    perPage, setPerPage,
    search,
    sortField, sortDir,
    filters,
    activeFilterCount,

    // Derived
    displayRows,
    filteredCount,

    // Column groups
    searchableColumns,
    filterableColumns,

    // Handlers
    handleSearch,
    handleSortToggle,
    handleFilterChange,
    clearFilters,
  };
}

// ── Pure sort helper ─────────────────────────────────────────────────────────
// Lives here because it's only ever used by this hook.

function applySorting(rows, field, dir) {
  if (!field) return rows;
  return [...rows].sort((a, b) => {
    const va = getNestedValue(a, field) ?? "";
    const vb = getNestedValue(b, field) ?? "";
    const cmp = String(va).localeCompare(String(vb), undefined, { numeric: true });
    return dir === "asc" ? cmp : -cmp;
  });
}