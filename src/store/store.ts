// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../redux/auth/authSlice";
import taskReducer from "../redux/auth/taskSlice";
import { authReducer } from "../redux/auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
