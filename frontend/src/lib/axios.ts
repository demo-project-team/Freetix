import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
  process.env.NODE_ENV === "production" ?
  process.env.NEXT_PUBLIC_API_URL :
  "http://localhost:5000",
  // 'http://192.168.20.188:5000/',
  withCredentials: true,
});

export default axiosInstance;
