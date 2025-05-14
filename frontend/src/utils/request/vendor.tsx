import axiosInstance from "@/lib/axios";
import {
  addressInput,
  imageInput,
  roomInput,
  tableInput,
  vendorInput,
} from "@/schemas/schemas";
import { City, District, Image, Table, Vendor } from "@/Types/types";
import { toast } from "sonner";
export const getVendor = async (): Promise<Vendor[]> => {
  try {
    const { data } = await axiosInstance.get(`/vendor`);
    console.log("request", data);

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
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
    const { data } = await axiosInstance.get(`/vendor/owner`, {
      withCredentials: true,
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const postVendor = async (values: vendorInput, category: string[]) => {
  try {
    const response = await axiosInstance.post(
      `/vendor?categoryId=${category.toString()}`,
      values,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createRoom = async (values: roomInput, vendorId: string) => {
  try {
    const response = await axiosInstance.post(`/room/${vendorId}`, values, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getRoom = async () => {
  try {
    const { data } = await axiosInstance.get(`/room`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postTable = async (value: tableInput, roomId: string | null) => {
  try {
    const response = await axiosInstance.post(`/room/table/${roomId}`, value, {
      withCredentials : true
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getTable = async (roomId: string | null): Promise<Table[]> => {
  try {
    const { data } = await axiosInstance.get(`/room/table/${roomId}`, {
      withCredentials : true
    });
    return data.table;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getRoomUser = async (
  vendorId: string | null
): Promise<Vendor | null> => {
  try {
    const { data } = await axiosInstance.get(`/vendor/getone/${vendorId}`);
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const postAddress = async (value: addressInput) => {
  try {
    const res = await axiosInstance.post(`/address/address`, value, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getCity = async (): Promise<City[]> => {
  try {
    const { data } = await axiosInstance.get(`/address/city`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getDistrict = async (cityId: string): Promise<District[]> => {
  if (!cityId) {
    console.log("cityId required");
    return [];
  }
  try {
    const { data } = await axiosInstance.get(`/address/district/${cityId}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const deleteTable = async (tableId: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/room/table/${tableId}`);
    return true;
  } catch (error) {
    console.error("Ширээ устгах үед алдаа гарлаа:", error);
    toast.error("Ширээ устгах үед алдаа гарлаа");
    return false;
  }
};
export const putVendor = async (value: vendorInput) => {
  console.log(value);

  try {
    const { data } = await axiosInstance.put(`/vendor`, value);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addImage = async (value: imageInput) => {
  try {
    const response = await axiosInstance.post(`/vendor/image`, value);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const editImage = async (id :string) =>{
  try {
    await axiosInstance.put(`/vendor/image/${id}`)
  } catch (error) {
    console.log(error);
  }
}
export const getImage = async () :Promise<Image[] | null> => {
  try {
    const {data} = await axiosInstance.get(`/vendor/image`)
    return data.data
  } catch (error) {
    console.log(error);
    return null
    
  }
}
