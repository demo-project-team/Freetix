import axiosInstance from "@/lib/axios";
import { categoryInput } from "@/schemas/schemas";

export const postCategory = async (values: categoryInput) => {
  try {
    const response = await axiosInstance.post("/category", values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getCategory = async () => {
  try {
    const { data } = await axiosInstance.get("/category");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const putCategory = async (id: string, values: categoryInput) => {
  try {
    const { data } = await axiosInstance.put(`/category/${id}`, values);
    return data;
  } catch (error) {
    console.log(error);
  }
};
