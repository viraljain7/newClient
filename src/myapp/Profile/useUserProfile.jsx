import { useState, useCallback } from 'react';

import {
  fetchUserDetails,
  updateProfile,
  fetchUserScheme,
  updateUserScheme,
  updateUserPassword,
  updateUserKycStatus,
  updateUserWallet,
  fetchUserParent,
  updateUserParent,
  linkUserMid,
  getUserMid,
  updateUserMid
} from './memberUserUpdateApi';
import { startLoading, stopLoading } from '../../store/slices/loaderSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const useUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(null);

  const handleRequest = async (callback) => {
    try {
      setLoading(true);
      dispatch(startLoading());
      setError(null);

      const response = await callback();

      return response;
    } catch (err) {
      toast.error(err?.response?.data?.message || 'An error occurred');
      setError(err?.response?.data || err.message);

      throw err;
    } finally {
      setLoading(false);
      dispatch(stopLoading());
    }
  };

  // ================= USER DETAILS =================

  const getUserDetails = useCallback(async (payload) => {
    const response = await handleRequest(() => fetchUserDetails(payload));
    setUserDetails(response.data);

    return response;
  }, []);

  const refetchUserDetails = useCallback(
    async (payload) => {
      return await getUserDetails(payload);
    },
    [getUserDetails]
  );

  // ================= PROFILE =================

  const handleUpdateProfile = async (payload) => {
    return handleRequest(() => updateProfile(payload));
  };

  // ================= SCHEME =================

  const getUserSchemes = async (payload) => {
    return handleRequest(() => fetchUserScheme(payload));
  };

  const handleUpdateScheme = async (payload) => {
    return handleRequest(() => updateUserScheme(payload));
  };

  // ================= PASSWORD =================

  const handleUpdatePassword = async (payload) => {
    return handleRequest(() => updateUserPassword(payload));
  };

  // ================= KYC =================

  const handleUpdateKycStatus = async (payload) => {
    return handleRequest(() => updateUserKycStatus(payload));
  };

  // ================= WALLET =================

  const handleUpdateWallet = async (payload) => {
    return handleRequest(() => updateUserWallet(payload));
  };

  // ================= PARENT =================

  const getUserParents = async (payload) => {
    return handleRequest(() => fetchUserParent(payload));
  };

  const handleUpdateParent = async (payload) => {
    return handleRequest(() => updateUserParent(payload));
  };

  // ================= MID =================

  const updateMidForUser = async (payload) => {

    return handleRequest(() => updateUserMid(payload));
  };

  const linkMidForUser = async (payload) => {
    return handleRequest(() => linkUserMid(payload));
  };

  const getMidForUser = async (payload) => {
    return handleRequest(() => getUserMid(payload));
  };

  return {
    loading,
    error,

    userDetails,
    getUserDetails,
    refetchUserDetails,

    handleUpdateProfile,

    getUserSchemes,
    handleUpdateScheme,

    handleUpdatePassword,

    handleUpdateKycStatus,

    handleUpdateWallet,

    getUserParents,
    handleUpdateParent,

    updateMidForUser,
    linkMidForUser,
    getMidForUser
  };
};

export default useUserProfile;
