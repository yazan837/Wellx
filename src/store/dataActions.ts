import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDataApi } from "../service/api";

export const fetchData = createAsyncThunk("data/fetchData", async (page) => {
  const data = await fetchDataApi(page);
  return data;
});
