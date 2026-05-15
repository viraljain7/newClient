import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchSchemeList, addScheme, schemeProducts, schemeProviders, getSchemeCommission, updateSchemeCommission } from './schemeApi';

import { stopLoading, startLoading } from '../../../store/slices/loaderSlice';

const useSchemeManager = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const [schemes, setSchemes] = useState([]);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [commission, setCommission] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);


  const handleRequest = async (callback) => {
    try {
      dispatch(startLoading());
      setLoading(true);

      setError(null);

      const response = await callback();

      return response;
    } catch (err) {
      console.error(err);

      setError(err?.response?.data?.message || err?.message || 'Something went wrong');

      throw err;
    } finally {
      dispatch(stopLoading());
        setLoading(false);
    }
  };

  // Scheme List
  const getSchemeList = async () => {
    const res = await handleRequest(() => fetchSchemeList());

    setData(res?.data || []);
    setTotal(res?.data?.length || 0);

    return res;
  };

  // Add Scheme + Refresh
  const createScheme = async (form) => {
    const res = await handleRequest(() => addScheme(form));

    // refresh list automatically
    await getSchemeList();

    return res;
  };

  // Products
  const getSchemeProducts = async () => {
    const res = await handleRequest(() => schemeProducts());

    setProducts(res?.data || []);


    return res;
  };

  // Providers
  const getSchemeProviders = async (form) => {
    const res = await handleRequest(() => schemeProviders(form));

    setProviders(res?.data || []);

    return res;
  };

  // Commission
  const fetchSchemeCommission = async (form) => {
    const res = await handleRequest(() => getSchemeCommission(form));

    setCommission(res?.data || []);

    return res;
  };

  // Update Commission + Refresh
  const setSchemeCommission = async (form) => {
    const res = await handleRequest(() => updateSchemeCommission(form));

    await fetchSchemeCommission({
      scheme_id: form.scheme_id
    });

    return res;
  };

  return {
    error,

    schemes,
    products,
    providers,
    commission,

    getSchemeList,
    createScheme,
    getSchemeProducts,
    getSchemeProviders,
    fetchSchemeCommission,
    setSchemeCommission,

    total,
    data,
    loading
  };
};

export default useSchemeManager;
