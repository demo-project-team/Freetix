import axiosInstance from "@/lib/axios";
import { pcInput } from "@/schemas/schemas";

export const putPc = async (value: pcInput, ids: string[], roomID: string) => {
  try {
    const {data} = await axiosInstance.put(
      `/vendor/pc/${roomID}?ids=${ids}`,
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
