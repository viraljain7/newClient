import { useEffect, useState } from 'react';
import { fetchAllUsers } from './fundApi.js'; // adjust path

const useFund = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  // Fetch All Users
  const getAllUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchAllUsers();

      setUsers(data.data);
      setTotal(data.data.length || 0);
    } catch (err) {
      setError(err?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return {
    users,
    loading,
    error,
    getAllUsers,
    total
  };
};

export default useFund;
