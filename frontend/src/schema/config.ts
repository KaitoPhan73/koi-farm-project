import { z } from "zod";

// Định nghĩa schema cho các biến môi trường
const configSchema = z.object({
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_BAG_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL_PRODUCTION: z.string(),
});

// Kiểm tra môi trường hiện tại
const isDev = process.env.NODE_ENV === "development";

// Sử dụng URL phù hợp tùy vào môi trường
const configProject = configSchema.safeParse({
  NEXT_PUBLIC_URL: isDev
    ? process.env.NEXT_PUBLIC_URL // URL cho môi trường development
    : process.env.NEXT_PUBLIC_URL_PRODUCTION, // URL cho môi trường production
  NEXT_PUBLIC_BAG_API_ENDPOINT: process.env.NEXT_PUBLIC_BAG_API_ENDPOINT,
  NEXT_PUBLIC_URL_PRODUCTION: process.env.NEXT_PUBLIC_URL_PRODUCTION,
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error("Các giá trị khai báo trong file .env không hợp lệ");
}

// Lấy dữ liệu cấu hình từ kết quả parse
const envConfig = configProject.data;
export default envConfig;
