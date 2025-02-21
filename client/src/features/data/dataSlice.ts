import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./dataActions";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });

    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      console.log("Error", action.error.message);
      state.isLoading = false
      state.isError = true;
    });
  },
});

export default dataSlice.reducer;
