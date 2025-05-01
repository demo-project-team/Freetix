import axiosInstance from "@/lib/axios";
import { pcInput } from "@/schemas/schemas";


export const putPc = async (value: pcInput, ids: string[], roomID:string) => {
  try {
    const response = await axiosInstance.put(`/vendor/pc/${roomID}?ids=${ids}`, value);
    return response;
  } catch (error) {
    console.log(error);
  }
};
