import React from "react";
import { fetchMember, fetchStates, createAgent } from "./memberApi";

export const useMember = (type) => {
  const [data, setData] = React.useState([]);
  const [states, setStates] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [creating, setCreating] = React.useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(20);
  const [total, setTotal] = React.useState(0);
  const [lastPage, setLastPage] = React.useState(1);

  // Filters
  const [searchTerm, setSearchTerm] = React.useState("");

  // 🔹 Fetch Members
  const getMembers = React.useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetchMember({
        type,
        page: currentPage,
        perPage: itemsPerPage,
        search: searchTerm,
      });

      const pageData = res.data;

      setData(pageData || []);
      setTotal(res.pagination.total || 0);
      setCurrentPage(res.pagination.current_page || 1);
      setItemsPerPage(res.pagination.per_page || 20);
      setLastPage(res.pagination.last_page || 1);
    } catch (e) {
      console.error("Member Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  }, [
    type,
    currentPage,
    itemsPerPage,
    searchTerm,
  ]);

  // 🔹 Fetch States
  const getStates = React.useCallback(async () => {
    try {
      const res = await fetchStates();
      setStates(res?.data || []);
    } catch (e) {
      console.error("State Fetch Error:", e);
    }
  }, []);

  // 🔹 Create Agent
  const addAgent = async (form) => {
    try {
      setCreating(true);

      const res = await createAgent(form);

      return res;
    } catch (e) {
      console.error("Create Agent Error:", e);
      throw e;
    } finally {
      setCreating(false);
    }
  };

  React.useEffect(() => {
    if (type) {
      getMembers();
    }
  }, [getMembers]);

  React.useEffect(() => {
    getStates();
  }, [getStates]);

  return {
    data,
    total,
    lastPage,
    currentPage,
    itemsPerPage,
    states,
    loading,
    creating,

    setCurrentPage,
    setItemsPerPage,
    setSearchTerm,

    searchTerm,

    refetch: getMembers,

    addAgent,
  };
};