// features/countries/countrySlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { data: [], loading: false, error: null };

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCountries, setLoading, setError } = countrySlice.actions;

// Async Thunk Action to Fetch Data
export const fetchCountries = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(
      "https://restcountries.com/v2/all?fields=name,region,flag"
    );
    dispatch(setCountries(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default countrySlice.reducer;
