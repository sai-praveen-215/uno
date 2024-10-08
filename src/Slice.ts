import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an initial state
interface ApiState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: [],
  loading: false,
  error: null,
};

// Create an async thunk for the API call
export const getApi = createAsyncThunk(
  "api/getApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      return response.data; // Assuming the API response contains the data in `response.data`
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice
const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the async action and reducer
export default apiSlice.reducer;
