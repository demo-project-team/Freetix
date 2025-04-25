import axiosInstance from "@/lib/axios";
import { roomInput, vendorInput } from "@/schemas/schemas";
import Cookies from "js-cookie";
export const getVendor = async (categoryId: string) => {
  try {
    const { data } = await axiosInstance.get(`/vendor/${categoryId}`);
    return data;
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
    throw new Error('Organization token not found');
  }

  try {
    const response = await axiosInstance.post(`/vendor?categoryId=${category.toString()}`, values, {
      headers: {
        Authorization: `Bearer ${organization}`,
      },
      
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createRoom = async (values : roomInput, vendorId : string) => {
  const token = Cookies.get('org')
  try {
    const response = await axiosInstance.post(`/room/${vendorId}`, values, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    console.log(error);
  }
}