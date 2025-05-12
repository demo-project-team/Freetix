import axiosInstance from "@/lib/axios";
import { pcInput } from "@/schemas/schemas";

export const putPc = async (value: pcInput) => {
  try {
    const {data} = await axiosInstance.put(
      `/vendor`,
      value,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
