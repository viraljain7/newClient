import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { startLoading, stopLoading } from '../../../store/slices/loaderSlice';

import { step4BankVerify } from './kycApi';

// ==============================
// INITIAL STATE
// ==============================
const initialState = {
  loading: false,
  error: null,
  success: null
};

// ==============================
// USE STEP 4
// ==============================
export const useStep4 = () => {
  const dispatch = useDispatch();

  const [bankVerifyState, setBankVerifyState] = useState(initialState);

  // ==============================
  // BANK VERIFY
  // ==============================
  const verifyBank = useCallback(
    async (form) => {
      try {
        dispatch(startLoading());

        setBankVerifyState({
          loading: true,
          error: null,
          success: null
        });

        const response = await step4BankVerify(form);

        setBankVerifyState({
          loading: false,
          error: null,
          success: response
        });

        return response;
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Bank verification failed';

        setBankVerifyState({
          loading: false,
          error: message,
          success: null
        });

        throw error;
      } finally {
        dispatch(stopLoading());
      }
    },
    [dispatch]
  );

  // ==============================
  // RESET STATES
  // ==============================
  const resetStep4States = () => {
    setBankVerifyState(initialState);
  };

  return {
    // actions
    verifyBank,
    resetStep4States,

    // states
    bankVerifyState
  };
};
