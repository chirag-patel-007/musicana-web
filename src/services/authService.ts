// src/redux/auth/authService.ts
import api from "./AuthAgent";

const login = async (credentials: { username: string; password: string }) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

const refreshToken = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};

const logout = async () => {
  await api.post("/auth/logout");
};

export default {
  login,
  refreshToken,
  logout,
};
