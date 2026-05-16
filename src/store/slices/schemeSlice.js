import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scheme_id: null,
  scheme_name: null,
  product_name: null,
};

const schemeSlice = createSlice({
  name: "scheme",

  initialState,

  reducers: {
    setSchemeId: (state, action) => {
      state.scheme_id = action.payload;
    },

    setSchemeName: (state, action) => {
      state.scheme_name = action.payload;
    },

    setProductName: (state, action) => {
      state.product_name = action.payload;
    },

    

    resetScheme: (state) => {
      state.scheme_id = null;
      state.scheme_name = null;
      state.product_name = null;
    },
  },
});

export const {
  setSchemeId,
  setSchemeName,
  setProductName,

  resetScheme,
} = schemeSlice.actions;

export default schemeSlice.reducer;