



// import { useState, useEffect, useCallback } from "react";

// export function useTransactions({
//   fromDate,
//   toDate,
//   initialPage    = 1,
//   initialPerPage = 100,
// } = {}) {
//   const [rows, setRows]       = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError]     = useState(null);
//   const [page, setPage]       = useState(initialPage);
//   const [perPage, setPerPage] = useState(initialPerPage);

//   // pagination holds what the SERVER told us — used by SmartTable
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     lastPage:    1,
//     perPage:     initialPerPage,
//     total:       0,
//   });

//   const load = useCallback(async () => {
//     if (!fromDate || !toDate) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         "https://digiphonepay.com/public/api/statement/all",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer 8082|cj7YVguoJLj8qDspXtTIjkfulJ1vgLTbLT8U0JCT3da69443",
//           },
//           body: JSON.stringify({
//             page,
//             per_page: perPage,
//             from_date: fromDate,
//             to_date:   toDate,
//           }),
//         }
//       );

//       const result = await response.json();

//       setRows(result?.data || []);

//       // Map snake_case API fields → camelCase for our app
//       const p = result?.pagination || {};
//       setPagination({
//         currentPage: p.current_page ?? 1,
//         lastPage:    p.last_page    ?? 1,
//         perPage,          // ✅ use OUR state — never trust API's per_page echo
//         total:       p.total ?? 0,
//       });

//     } catch (err) {
//       setError(err.message || "Network error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [page, perPage, fromDate, toDate]);

//   useEffect(() => {
//     load();
//   }, [load]);

//   const handlePerPageChange = useCallback((newPerPage) => {
//     setPerPage(newPerPage);
//     setPage(1);
//     // Optimistically reset so UI doesn't flash stale page count
//     setPagination((prev) => ({ ...prev, currentPage: 1, perPage: newPerPage }));
//   }, []);

//   return {
//     rows,
//     loading,
//     error,
//     pagination,   // ← THIS is what was missing in your old file
//     page,
//     setPage,
//     perPage,
//     setPerPage: handlePerPageChange,
//     refetch: load,
//   };
// }



import { useState, useEffect, useCallback, useRef } from "react";

export function useTransactions({
  fromDate,
  toDate,
  initialPage = 1,
  initialPerPage = 50,
} = {}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    lastPage: 1,
    perPage: initialPerPage,
    total: 0,
  });

  // prevent race conditions when page/date changes rapidly
  const abortRef = useRef(null);

  const load = useCallback(async () => {
    if (!fromDate || !toDate) {
      setRows([]);
      return;
    }

    // cancel previous request
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://digiphonepay.com/public/api/statement/all",
        {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 8082|cj7YVguoJLj8qDspXtTIjkfulJ1vgLTbLT8U0JCT3da69443",
          },
          body: JSON.stringify({
            page,
            per_page: perPage,
            from_date: fromDate,
            to_date: toDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const result = await response.json();

      // ignore aborted responses
      if (controller.signal.aborted) return;

      const serverPagination = result?.pagination ?? {};

      setRows(Array.isArray(result?.data) ? result.data : []);

      setPagination({
        currentPage: serverPagination.current_page ?? page,
        lastPage: serverPagination.last_page ?? 1,
        perPage,
        total: serverPagination.total ?? 0,
      });
    } catch (err) {
      if (err.name === "AbortError") return;

      setError(err.message || "Unable to fetch transactions");
      setRows([]);

      setPagination((prev) => ({
        ...prev,
        total: 0,
        lastPage: 1,
      }));
    } finally {
      if (!abortRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [fromDate, toDate, page, perPage]);

  useEffect(() => {
    load();

    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  const handlePageChange = useCallback((newPage) => {
    setPage((prev) => (prev === newPage ? prev : newPage));
  }, []);

  const handlePerPageChange = useCallback((newPerPage) => {
    setPerPage((prev) => {
      if (prev === newPerPage) return prev;
      return newPerPage;
    });

    setPage(1);

    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
      perPage: newPerPage,
    }));
  }, []);

  const refetch = useCallback(() => {
    load();
  }, [load]);

  return {
    rows,
    loading,
    error,

    page,
    setPage: handlePageChange,

    perPage,
    setPerPage: handlePerPageChange,

    pagination,
    refetch,
  };
}