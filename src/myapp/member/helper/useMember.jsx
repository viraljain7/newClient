import React from "react";
import { fetchMember, fetchStates, createAgent } from "./memberApi";

export const useMember = (type) => {
  const [data, setData] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [creating, setCreating] = React.useState(false);

  // 🔹 Fetch Members
  const getMembers = async () => {
    try {
      setLoading(true);
      const res = await fetchMember(type);

      setData(res?.data || []);
      setTotal(res?.count || 0);
    } catch (e) {
      console.error("Member Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch States
  const getStates = async () => {
    try {
      const res = await fetchStates();
      setStates(res?.data || []);
    } catch (e) {
      console.error("State Fetch Error:", e);
    }
  };

  // 🔹 Create Agent
  const addAgent = async (form) => {
    try {
      setCreating(true);

      const res = await createAgent(form);

      if (res?.statuscode === "TXN") {
        await getMembers(); // refresh list
      }

      return res;
    } catch (e) {
      console.error("Create Agent Error:", e);
      throw e;
    } finally {
      setCreating(false);
    }
  };

  React.useEffect(() => {
    if (type) getMembers();
    getStates();
  }, [type]);

  return {
    data,
    total,
    states,
    loading,
    creating,
    refetch: getMembers,
    addAgent
  };
};