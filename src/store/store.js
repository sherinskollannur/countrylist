import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import countryReducer from "./countrySlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    country: countryReducer,
  },
});
