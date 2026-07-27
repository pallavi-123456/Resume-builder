import api from "./api";

const updateProfile = async ({ name, headline, avatar }) => {
  const { data } = await api.put("/users/profile", { name, headline, avatar });
  return data;
};

const changePassword = async ({ currentPassword, newPassword }) => {
  const { data } = await api.put("/users/change-password", { currentPassword, newPassword });
  return data;
};

export default { updateProfile, changePassword };
