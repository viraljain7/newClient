// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = null;
    },
    setUserActiveService: (state, action) => {
      state.service = action.payload;
    },
      clearUserActiveService: (state) => {
      state.service = null;
    },
  }
});

export const { setUserProfile, clearUserProfile, setUserActiveService,clearUserActiveService } = userSlice.actions;
export default userSlice.reducer;
