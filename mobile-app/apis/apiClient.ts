import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Tạo instance của axios với cấu hình mặc định
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Bạn có thể thêm token vào headers ở đây
    return config;
  },
  (error) => {
    // Log lỗi request
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

// Interceptor cho response
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Log lỗi response
    console.log("Response error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
