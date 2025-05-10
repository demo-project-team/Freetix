import axiosInstance from "@/lib/axios"


export const postReview = async () => {
    try {
        const response = await axiosInstance.post(`/review`)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getReview = async (id : string) => {
    try {
        const {data} = await axiosInstance.get(`/review/${id}`)
        return data
    } catch (error) {
        console.log(error);
    }
}