import axiosInstance from "@/lib/axios";
import { roomInput, tableInput, vendorInput } from "@/schemas/schemas";
import { Room, Table } from "@/Types/types";
import Cookies from "js-cookie";
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
  const organization = Cookies.get("org");
  try {
    const { data } = await axiosInstance.get(`/vendor/owner`, {
      headers: {
        Authorization: `Bearer ${organization}`,
      },
    });
    console.log(data);

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const postVendor = async (values: vendorInput, category: string[]) => {
  const organization = Cookies.get("org");
  console.log(category);
  if (!organization) {
    throw new Error("Organization token not found");
  }

  try {
    const response = await axiosInstance.post(
      `/vendor?categoryId=${category.toString()}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${organization}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createRoom = async (values: roomInput, vendorId: string) => {
  const token = Cookies.get("org");
  try {
    const response = await axiosInstance.post(`/room/${vendorId}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getRoom = async () => {
  const token = Cookies.get("org");
  try {
    const { data } = await axiosInstance.get(`/room`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postTable = async (value: tableInput, roomId: string | null) => {
  const token = Cookies.get("org");
  try {
    const response = await axiosInstance.post(`/room/table/${roomId}`, value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getTable = async (roomId: string | null):Promise<Table[]> => {
  const token = Cookies.get("org");
  try {
    const { data } = await axiosInstance.get(`/room/table/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.table;
  } catch (error) {
    console.log(error);
    return []
  }
};
export const getRoomUser = async (vendorId: string | null):Promise<Room[]> => {
  try {
    const {data} = await axiosInstance.get(`/room/user/${vendorId}`,)
    return data
  } catch (error) {
    console.log(error);
    return []
  }
}
