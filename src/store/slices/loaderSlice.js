import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    startLoading: (state) => {
      state.loading = true;
    },

    stopLoading: (state) => {
      state.loading = false;
    }
  }
});

export const {
  setLoading,
  startLoading,
  stopLoading
} = loaderSlice.actions;

export default loaderSlice.reducer;