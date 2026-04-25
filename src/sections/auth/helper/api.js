
import api from "../../../shared/BaseApi";

export const loginUser = async (payload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([k, v]) => {
    formData.append(k, v);
  });

  const res = await api.post(
    "/auth/login", // ✅ use baseURL
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // 🔥 IMPORTANT
      },
    }
  );

  return res.data;
};






export const logoutUser = async () => {
  const res = await api.get("/auth/logout"); // or POST if backend requires
  return res.data;
};