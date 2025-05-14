import axiosInstance from "@/lib/axios";
import {
  OrganizationInput,
  OrganizationLoginInput,
  statusInput,
  UserLoginInput,
  UserRegisterInput,
} from "@/schemas/userSchema";
import { Booking, User } from "@/Types/types";
import { toast } from "sonner";
export const singUpRequest = async (values: UserRegisterInput) => {
  try {
    const response = await axiosInstance.post(`/auth/sign-up`, values, {
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    toast.error("Бүртгүүлэлт амжилтгүй")
  }
};
export const signInRequest = async (values: UserLoginInput) => {
  try {
    const response = await axiosInstance.post(`/auth/sign-in`, values, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const signUpOrg = async (values: OrganizationInput) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/organization/sign-up",
      values
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const loginOrg = async (values: OrganizationLoginInput) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/organization/sign-in",
      values,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getOrg = async () => {
  try {
    const { data } = await axiosInstance.get(`/org`, { withCredentials: true });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const putOrgReq = async (value: statusInput, id: string) => {
  try {
    await axiosInstance.put(`/org/${id}`, value, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPublicProfile = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/profile", {
      withCredentials: true,
    });
    console.log(data);
    
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout/user",{}, {
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getUser = async ():Promise<User | null> => {
  try {
    const {data} = await axiosInstance.get(`/user`, {
      withCredentials: true
    })
    console.log(data);
    
    return data.user
  } catch (error) {
    console.log(error);
    return null
    
  }
}
export const getBookings = async ():Promise<Booking[]> =>{
  try {
    const {data} = await axiosInstance.get('/user/booking')
    return data.data
  } catch (error) {
    console.log(error);
    return []
  }
}