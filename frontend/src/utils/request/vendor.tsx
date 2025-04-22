import axiosInstance from "@/lib/axios"

export const getVendor = async (categoryId : string) => {
    try {
        const {data} = await axiosInstance.get(`/vendor/${categoryId}`)
        return data
    } catch (error) {
        console.log(error)
    }
}
export const getVendorByFilter = async (name? : string, categoryId? :string[], districtId? : string) => {
    try {
        const {data} = await axiosInstance.get(`/category`, {           
            params : {
                name, 
                categoryId, 
                districtId,
            }
         })
         return data
    } catch (error) {
        console.log(error);
    }
}