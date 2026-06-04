import api from "./axios";

export const logoutUser = async () => {
  return await api.post("/users/logout");
};

export const registerUser = async (data) => {
  return await api.post("/users/register", data);
};

export const verifyOTP = async (otp) => {
  return await api.post("/users/verify-email", { otp });
};

export const getCurrentUser = async () => {
  return await api.get("/users/me");
};

export const loginUser = async (data) => {
  return await api.post("/users/login", data);
};
