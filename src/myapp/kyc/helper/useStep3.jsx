import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { step3PanVerify } from './kycApi';
import { startLoading, stopLoading } from '../../../store/slices/loaderSlice';

// ==============================
// INITIAL STATE
// ==============================
const initialState = {
  loading: false,
  error: null,
  success: null
};

// ==============================
// USE STEP 3
// ==============================
export const useStep3 = () => {
  const dispatch = useDispatch();

  const [panVerifyState, setPanVerifyState] = useState(initialState);

  // ==============================
  // PAN VERIFY
  // ==============================
  const verifyPan = useCallback(
    async (form) => {
      try {
        dispatch(startLoading());

        setPanVerifyState({
          loading: true,
          error: null,
          success: null
        });

        const response = await step3PanVerify(form);
        console.log(response);

        setPanVerifyState({
          loading: false,
          error: null,
          success: response
        });

        return response;
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'PAN verification failed';

        setPanVerifyState({
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
  const resetStep3States = () => {
    setPanVerifyState(initialState);
  };

  return {
    // actions
    verifyPan,
    resetStep3States,

    // states
    panVerifyState
  };
};
