import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";


// Tạo instance của axios với cấu hình mặc định
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || "http://10.10.10.230:5000/", // Sử dụng biến môi trường
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



apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        // Log lỗi response with more details
        console.log("Response error:", error.message); // Log the error message
        if (error.response) {
            console.log("Response data:", error.response.data); // Log response data if available
            console.log("Response status:", error.response.status); // Log response status
            console.log("Response headers:", error.response.headers); // Log response headers
        } else if (error.request) {
            console.log("Request made but no response received:", error.request); // Log request if no response
        } else {
            console.log("Error setting up request:", error.message); // Log any other errors
        }
        return Promise.reject(error);
    }
);

// Hàm đăng nhập
export const login = async (username: string, password: string): Promise<AxiosResponse> => {
    const requestBody = { username, password };

    console.log("Login request body:", requestBody);
    const response = await apiClient.post('auth/login', requestBody);
    return response;
};

// Hàm đăng ký
export const register = async (username: string, fullName: string, email: string, phone: string, address: string, password: string): Promise<AxiosResponse> => {
    const requestBody = { username, fullName, email, phone, address, password };

    const response = await apiClient.post('auth/register', requestBody);
    return response;

};



export default apiClient;
