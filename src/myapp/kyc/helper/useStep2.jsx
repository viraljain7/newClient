import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { step2VerifyAadhaarMobile, step2InitiateDigiLocker } from './kycApi';
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
// USE STEP 2
// ==============================
export const useStep2 = () => {
  const dispatch = useDispatch();

  const [verifyMobileState, setVerifyMobileState] = useState(initialState);

  const [digilockerState, setDigilockerState] = useState(initialState);

  // ==============================
  // VERIFY AADHAAR MOBILE
  // ==============================
  const verifyAadhaarMobile = useCallback(
    async (form) => {
      try {
        dispatch(startLoading());

        setVerifyMobileState({
          loading: true,
          error: null,
          success: null
        });

        const response = await step2VerifyAadhaarMobile(form);

        setVerifyMobileState({
          loading: false,
          error: null,
          success: response
        });

        return response;
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Failed to verify mobile';

        setVerifyMobileState({
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
  // INITIATE DIGILOCKER
  // ==============================
  const initiateDigiLocker = useCallback(async () => {
    try {
      dispatch(startLoading());

      setDigilockerState({
        loading: true,
        error: null,
        success: null
      });

      const response = await step2InitiateDigiLocker();

      setDigilockerState({
        loading: false,
        error: null,
        success: response
      });

      return response;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to initiate DigiLocker';

      setDigilockerState({
        loading: false,
        error: message,
        success: null
      });

      throw error;
    } finally {
      dispatch(stopLoading());
    }
  }, [dispatch]);

  // ==============================
  // RESET STATES
  // ==============================
  const resetStep2States = () => {
    setVerifyMobileState(initialState);
    setDigilockerState(initialState);
  };

  return {
    // actions
    verifyAadhaarMobile,
    initiateDigiLocker,
    resetStep2States,

    // states
    verifyMobileState,
    digilockerState
  };
};
