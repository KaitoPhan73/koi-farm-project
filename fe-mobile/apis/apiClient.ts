import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Tạo instance của axios với cấu hình mặc định
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Bạn có thể thêm token vào headers ở đây
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
