import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./dataActions";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export default dataSlice.reducer;
