// store/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bbpsReducer from "./slices/bbpsSlice";
import loaderReducer from './slices/loaderSlice';


const rootReducer = combineReducers({
  user: userReducer,
  bbps:bbpsReducer,
    loader: loaderReducer

});

export default rootReducer;