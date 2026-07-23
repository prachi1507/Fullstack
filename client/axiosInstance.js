import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const bookBaseUrl = axios.create({
  baseURL: `${API_BASE_URL}/book`,
});

export const userBaseUrl = axios.create({
  baseURL: `${API_BASE_URL}/user`,
});

bookBaseUrl.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("userAuth");
    const token = JSON.parse(authToken)?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("auth-req-errr", error);
  }
);

bookBaseUrl.interceptors.response.use((response)=> response, (error)=>{
  if(error.response && error.response.status === 401){
    localStorage.removeItem('userAuth');
    window.location.href = '/login'
  }
})