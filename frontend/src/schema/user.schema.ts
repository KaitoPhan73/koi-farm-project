import { z } from "zod";

// Enum cho role và status
const UserRole = ["Customer", "Staff", "Manager"] as const;
const UserStatus = ["Active", "Inactive", "Banned"] as const;

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
  role: z.enum(UserRole).default("Customer"),
  status: z.enum(UserStatus).default("Active"),
});

// Schema cho việc cập nhật User
export const UpdateUserSchema = z.object({
  _id: z.string().min(1, { message: "User ID is required" }),
  username: z.string().min(1).optional(),
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(UserRole).optional(),
  status: z.enum(UserStatus).optional(),
});

// Schema cho việc cập nhật status
export const UpdateUserStatusSchema = z.object({
  status: z.enum(UserStatus),
});

// Types
export type TUserRole = (typeof UserRole)[number];
export type TUserStatus = (typeof UserStatus)[number];

export type TUserRequest = z.TypeOf<typeof UserSchema>;
export type TUpdateUserRequest = z.TypeOf<typeof UpdateUserSchema>;
export type TUpdateUserStatusRequest = z.TypeOf<typeof UpdateUserStatusSchema>;

export type TUserResponse = Omit<TUserRequest, "password"> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
