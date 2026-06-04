import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";

/**
 * Redux store
 *
 * Starts empty. Add slices as features grow:
 *  - uiSlice      : modal open/close, theme
 *  - spaceSlice   : selected planet, active satellite
 *  - userSlice    : auth state, progress
 */

const store = configureStore({
  reducer: {
    auth: authReducer,
    // ui: uiReducer,
    // space: spaceReducer,
  },
});

export default store;
