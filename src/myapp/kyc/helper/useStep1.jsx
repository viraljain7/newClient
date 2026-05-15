import { useState, useCallback } from 'react';
import { step1ContactDetails, step1Otp, step1VerifyOtp } from './kycApi.js';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../../store/slices/loaderSlice.js';

const initialState = {
  loading: false,
  error: null,
  success: null
};

export const useStep1 = () => {
  const dispatch = useDispatch();
  const [contactDetailsState, setContactDetailsState] = useState(initialState);

  const [otpState, setOtpState] = useState(initialState);

  const [verifyOtpState, setVerifyOtpState] = useState(initialState);

  // ==============================
  // STEP 1 CONTACT DETAILS
  // ==============================
  const submitContactDetails = useCallback(
    async (form) => {
      dispatch(startLoading());

      try {
        setContactDetailsState({
          loading: true,
          error: null,
          success: null
        });

        const response = await step1ContactDetails(form);


        setContactDetailsState({
          loading: false,
          error: null,
          success: response
        });

        return response;
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'Something went wrong';

        setContactDetailsState({
          loading: false,
          error: message,
          success: null
        });

        throw error;
      } finally {
        // GLOBAL LOADER STOP
        dispatch(stopLoading());
      }
    },
    [dispatch]
  );

  // ==============================
  // SEND OTP
  // ==============================
  const sendOtp = useCallback(async () => {
    dispatch(startLoading());

    try {
      setOtpState({
        loading: true,
        error: null,
        success: null
      });

      const response = await step1Otp();

      setOtpState({
        loading: false,
        error: null,
        success: response
      });

      return response;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Failed to send OTP';

      setOtpState({
        loading: false,
        error: message,
        success: null
      });

      throw error;
    } finally {
      // GLOBAL LOADER STOP
      dispatch(stopLoading());
    }
  }, [dispatch]);

  // ==============================
  // VERIFY OTP
  // ==============================
  const verifyOtp = useCallback(
    async (form) => {
      dispatch(startLoading());

      try {
        setVerifyOtpState({
          loading: true,
          error: null,
          success: null
        });

        const response = await step1VerifyOtp(form);

        setVerifyOtpState({
          loading: false,
          error: null,
          success: response
        });

        return response;
      } catch (error) {
        const message = error?.response?.data?.message || error?.message || 'OTP verification failed';

        setVerifyOtpState({
          loading: false,
          error: message,
          success: null
        });

        throw error;
      } finally {
        // GLOBAL LOADER STOP
        dispatch(stopLoading());
      }
    },
    [dispatch]
  );

  // ==============================
  // RESET STATES
  // ==============================
  const resetKycStates = () => {
    setContactDetailsState(initialState);
    setOtpState(initialState);
    setVerifyOtpState(initialState);
  };

  return {
    // actions
    submitContactDetails,
    sendOtp,
    verifyOtp,
    resetKycStates,

    // states
    contactDetailsState,
    otpState,
    verifyOtpState
  };
};
