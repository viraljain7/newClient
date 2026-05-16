import { useCallback, useState } from 'react';

import {
  fetchServiceList,
  updateService,
} from './serviceApi.js';
import { startLoading, stopLoading } from '../../../store/slices/loaderSlice.js';
import { useDispatch } from 'react-redux';

const useServiceManager = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [services, setServices] = useState([]);
  const dispatch = useDispatch();

  const handleRequest = async (callback) => {
    try {
      setLoading(true);

      setError(null);
      dispatch(startLoading());

      const response = await callback();

      return response;
    } catch (err) {
      setError(
        err?.response?.data || err.message
      );

      throw err;
    } finally {
      setLoading(false);
      dispatch(stopLoading());

    }
  };

  // ================= SERVICES =================

  const getServiceList = useCallback(
    async () => {
      const response = await handleRequest(
        () => fetchServiceList()
      );

      setServices(response?.data || []);

      return response;
    },
    []
  );

  const refetchServiceList = useCallback(
    async () => {
      return await getServiceList();
    },
    [getServiceList]
  );

  // ================= UPDATE =================

  const handleUpdateService =
    async (payload) => {
      return handleRequest(() =>
        updateService(payload)
      );
    };

  return {
    loading,
    error,

    services,

    getServiceList,
    refetchServiceList,

    handleUpdateService,
  };
};

export default useServiceManager;