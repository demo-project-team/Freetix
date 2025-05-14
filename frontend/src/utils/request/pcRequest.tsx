import axiosInstance from "@/lib/axios";
import { pcInput, timeInput } from "@/schemas/schemas";

export const putPc = async (value: pcInput) => {
  try {
    const {data} = await axiosInstance.put(
      `/vendor/pc`,
      value,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error 
  }
};
export const getUnavailablePc = async  (value : timeInput) => {
  try {
    const {data} = await axiosInstance.post('/vendor/unavailable', value)
    return data
  } catch (error) {
    console.log(error);
  }
}