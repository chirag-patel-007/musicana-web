import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      localStorage.setItem("accessToken", data.accessToken); // save here
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.refreshToken();
      localStorage.setItem("accessToken", data.accessToken); // update here
      return data.accessToken;
    } catch (error: any) {
      return rejectWithValue(error.message || "Refresh failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { loading: false, error: "" },
  reducers: {
    logout(state) {
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = "null";
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // handle error message
      })
      .addCase(refreshTokenThunk.fulfilled, (state) => {
        // just clear error or loading if needed
        state.error = "";
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
