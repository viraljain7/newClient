// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bbps: null
};

const bbpsSlice = createSlice({
  name: 'bbps',
  initialState,
  reducers: {
    setBBPS: (state, action) => {
      state.bbps = action.payload;
    },
  clearBBPS: (state) => {
      state.bbps = null;
    },
  }
});

export const { setBBPS,clearBBPS } = bbpsSlice.actions;
export default bbpsSlice.reducer;
