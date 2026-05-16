// hooks/useInitializeAuth.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import api from './BaseApi';

import {
  setUserProfile,
  setUserActiveService
} from '../store/slices/userSlice';

const useInitializeAuth = () => {

  const dispatch = useDispatch();

  // =========================
  // Get User Profile
  // =========================

  const getUserProfile = async () => {

    const formData = new FormData();

    formData.append('type', 'profile');

    const res = await api.post(
      '/member/transaction',
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data'
        }
      }
    );

    return res.data;
  };

  // =========================
  // Get Active Services
  // =========================

  const getActiveService = async () => {

    const formData = new FormData();

    formData.append('type', 'list');

    const res = await api.post(
      '/master/portal',
      formData
    );

    return res.data;
  };

  // =========================
  // Fetch Profile
  // =========================

  const fetchProfile = async () => {

    try {

      const res = await getUserProfile();

      if (res.statuscode === 'TXN') {

        dispatch(
          setUserProfile(res.data)
        );
      }

      return res;

    } catch (err) {

      console.error(err);

      return null;
    }
  };

  // =========================
  // Fetch Services
  // =========================

  const fetchActiveService = async () => {

    try {

      const res = await getActiveService();

      if (res.statuscode === 'TXN') {

        const activeServices =
          res.data.filter(
            (service) =>
              service.value === '1'
          );

        dispatch(
          setUserActiveService(
            activeServices
          )
        );
      }

      return res;

    } catch (err) {

      console.error(err);

      return null;
    }
  };

  // =========================
  // Initialize Automatically
  // =========================

  useEffect(() => {

    const init = async () => {

      await fetchProfile();

      await fetchActiveService();
    };

    init();

  }, []);

  // =========================
  // Export Methods
  // =========================

  return {
    fetchProfile,
    fetchActiveService,
    getUserProfile,
    getActiveService
  };
};

export default useInitializeAuth;