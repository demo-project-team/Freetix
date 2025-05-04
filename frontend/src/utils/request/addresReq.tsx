import axiosInstance from "@/lib/axios";

export const addCity = async (name: string) => {
  try {
    const response = await axiosInstance.post("address/city", { name });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const addDistrict = async (name: string, cityId: string) => {
  try {
    const response = await axiosInstance.post(`address/district/${cityId}`, {
      name,
    });
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
  }
};
