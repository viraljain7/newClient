// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import bbpsReducer from './slices/bbpsSlice';
import loaderReducer from './slices/loaderSlice';
import schemeReducer from './slices/schemeSlice';

const rootReducer = combineReducers({
  user: userReducer,
  bbps: bbpsReducer,
  loader: loaderReducer,
  scheme: schemeReducer
});

export default rootReducer;
