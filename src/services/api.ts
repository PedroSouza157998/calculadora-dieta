import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const getPortion = async (foodName: string, portion: string) => {
  const response = await api.get("/get-portion", {
    params: {
      foodName,
      portion,
    },
  });
  return response.data;
};

export default api;
