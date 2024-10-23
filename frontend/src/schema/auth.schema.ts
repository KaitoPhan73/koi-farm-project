import z from "zod";
import { UserSchema } from "./user.schema";

// Login schema for username and password
export const LoginSchema = z
  .object({
    username: z.string().min(2, {
      message: "Invalid username.",
    }),
    password: z.string().min(1, {
      message: "Password cannot be empty.",
    }),
  })
  .strict();

// Register schema for user registration
export const RegisterSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    role: z.string().min(1, {
      message: "Role cannot be empty.",
    }),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 digits.",
      })
      .regex(/^[0-9]+$/, {
        message: "Phone number must only contain digits.",
      }),
    address: z.string().optional().nullable(), // Address is optional and can be nullable
  })
  .strict();

// Auth response schema
export const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type TRegisterRequest = z.TypeOf<typeof RegisterSchema>;
export type TLoginRequest = z.TypeOf<typeof LoginSchema>;
export type TAuthResponse = z.TypeOf<typeof AuthResponseSchema>;
