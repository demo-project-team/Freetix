import axiosInstance from "@/lib/axios";
import { pcStatusInput } from "@/schemas/schemas";

export const putPc = async (value: pcStatusInput, ids: string[]) => {
  try {
    const response = await axiosInstance.put(`/vendor/pc?ids=${ids}`, value);
    return response;
  } catch (error) {
    console.log(error);
  }
};
