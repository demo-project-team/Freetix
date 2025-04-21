import axiosInstance from "@/lib/axios";
import { UserLoginInput, UserRegisterInput } from "@/schemas/userSchema";
import Cookies from "js-cookie";

export const singUpRequest = async (values: UserRegisterInput) => {
  try {
    const response = await axiosInstance.post(
      `/auth/sign-up`,
      values
    );
    console.log(response);
    Cookies.set('token', response.data.token, {expires : 7})
    return response
  } catch (error) {
    console.log(error);
  }
};
export const signInRequest = async (values: UserLoginInput) => {
  try {
    const response = await axiosInstance.post(
      `/auth/sing-in`,
      values
    );
    Cookies.set('token', response.data.token, {expires : 7})
    return response;
  } catch (error) {
    console.log(error);
  }
};

