import axiosInstance from "@/lib/axios";
import { vendorInput } from "@/schemas/schemas";
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
export const vendorByOwner = async (id: string) => {
    const organization = Cookies.get('org')
  try {
    const { data } = await axiosInstance.get(`/vendor/owner/${id}`, {
        headers : {
            Authorization:`Bearer ${organization}`
        }
    });
    console.log(data);
    
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const postVendor = async (values:vendorInput, category: string[])=> {
    const organization = Cookies.get('org')
    try {
        const response = await axiosInstance.post(`/vendor`,  values,
            {
                headers : {
                    Authorization : `Bearer ${organization}`
                },
                params : {category}
            }
        )
    } catch (error) {
        console.log(error);
    }
}