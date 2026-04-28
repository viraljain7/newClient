// store/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bbpsReducer from "./slices/bbpsSlice";


const rootReducer = combineReducers({
  user: userReducer,
  bbps:bbpsReducer
});

export default rootReducer;