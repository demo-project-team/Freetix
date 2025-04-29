import axiosInstance from "@/lib/axios";
import { roomInput, tableInput, vendorInput } from "@/schemas/schemas";
import { Room, Table } from "@/Types/types";
export const getVendor = async () => {
  try {
    const { data } = await axiosInstance.get(`/vendor`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getVendorByFilter = async (
  name?: string,
  categoryId?: string[],
  districtId?: string
) => {
  try {
    const { data } = await axiosInstance.get(`/category`, {
      params: {
        name,
        categoryId,
        districtId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const vendorByOwner = async () => {
  try {
    const { data } = await axiosInstance.get(`/vendor/owner`)
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const postVendor = async (values: vendorInput, category: string[]) => {
  try {
    const response = await axiosInstance.post(
      `/vendor?categoryId=${category.toString()}`,
      values
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createRoom = async (values: roomInput, vendorId: string) => {
  try {
    const response = await axiosInstance.post(`/room/${vendorId}`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getRoom = async () => {
  try {
    const { data } = await axiosInstance.get(`/room`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postTable = async (value: tableInput, roomId: string | null) => {
  try {
    const response = await axiosInstance.post(`/room/table/${roomId}`, value);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getTable = async (roomId: string | null): Promise<Table[]> => {
  try {
    const { data } = await axiosInstance.get(`/room/table/${roomId}`);
    return data.table;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getRoomUser = async (vendorId: string | null): Promise<Room[]> => {
  try {
    const { data } = await axiosInstance.get(`/room/user/${vendorId}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
