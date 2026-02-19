import axios from "axios";
import { type Food } from "@/data/foodTable";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_ENDPOINT,
});

export const getPortion = async (foodTable: string, foodName: string, portion: string) => {
  const response = await api.get("/portion/quantity", {
    params: {
      food_table: foodTable,
      name: foodName,
      portion,
    },
  });
  return response.data;
};

export const searchFood = async (foodTable: string, foodName: string): Promise<{list: Food[]}> => {
  const response = await api.get("/food/search", {
    params: {
      food_table: foodTable,
      value: foodName,
    },
  });
  return response.data;
};

export default api;
