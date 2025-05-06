import axiosInstance from "@/lib/axios";

export const getPayment = async (id : string | null) => {
    try {
        const {data} = await axiosInstance.get(`/payment/stripe/${id}`)
        return data.clientSecret
    } catch (error) {
        console.log(error);
        return null
    }
}
export const paymentSucces = async (id : string | null) => {
    try {
        const response = await axiosInstance.post(`/payment/${id}`)
         return response
    } catch (error) {
        console.log(error);
        return null
    }
}