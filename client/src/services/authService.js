import api from "./api";



const signup = async ({ name, email, password }) => {
  const { data } = await api.post("/auth/signup", { name, email, password });
  return data;
};

const login = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

const forgotPassword = async (email) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
};

const resetPassword = async (token, password) => {
  const { data } = await api.post(`/auth/reset-password/${token}`, { password });
  return data;
};

export default { signup, login, getMe, forgotPassword, resetPassword };
