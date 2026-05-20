import api from "./api";

export const login = async (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const response = await api.post("/auth/login", formData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};