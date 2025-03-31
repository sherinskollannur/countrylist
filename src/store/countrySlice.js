import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const countrySlice = createSlice({
  name: "countries",
  initialState: { data: [], loading: false, error: null },
  reducers: {
    setCountries: (state, action) => {
      state.data = action.payload;
      state.loading = false;
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
