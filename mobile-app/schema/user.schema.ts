import z from "zod";

// Schema cho User
export const UserSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["Customer", "Staff", "Manager", "Admin"]).optional(), // Tùy chọn
  status: z.enum(["Active", "Inactive", "Banned"]).optional(), // Tùy chọn
});

// Schema cho việc cập nhật User
export const UpdateUserSchema = z.object({
  _id: z.string().min(1, { message: "User ID is required" }), // ID người dùng bắt buộc
  username: z.string().min(1).optional(), // Tùy chọn
  fullName: z.string().min(1).optional(), // Tùy chọn
  email: z.string().email().optional(), // Tùy chọn
  phone: z.string().optional(), // Tùy chọn
  address: z.string().optional(), // Tùy chọn
  password: z.string().min(6).optional(), // Tùy chọn
  role: z.enum(["Customer", "Staff", "Manager", "Admin"]).optional(), // Tùy chọn
  status: z.enum(["Active", "Inactive", "Banned"]).optional(), // Tùy chọn
});

// Tạo loại dữ liệu từ schema
export type TUserRequest = z.TypeOf<typeof UserSchema>;
export type TUpdateUserRequest = z.TypeOf<typeof UpdateUserSchema>;
export type TUserResponse = z.TypeOf<typeof UserSchema> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
