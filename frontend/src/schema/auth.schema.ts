import z from "zod";

export const LoginSchema = z
  .object({
    emailOrUsername: z.string().min(2, {
      message: "Tài khoản hoặc Email sai",
    }),
    password: z.string().min(1, {
      message: "Mật khẩu không được trống.",
    }),
  })
  .strict();

export const RegisterSchema = z
  .object({
    username: z.string().min(4, {
      message: "Tên đăng nhập phải có ít nhất 2 ký tự.",
    }),
    password: z.string().min(8, {
      message: "Mật khẩu ít nhất 8 kí tự.",
    }),
    email: z.string().email({
      message: "Email không hợp lệ.",
    }),
    roleName: z.string().min(1, {
      message: "Vai trò không được trống.",
    }),
    phoneNumber: z
      .string()
      .min(10, {
        message: "Số điện thoại phải có ít nhất 10 ký tự.",
      })
      .regex(/^[0-9]+$/, {
        message: "Số điện thoại chỉ bao gồm các chữ số.",
      }),
  })
  .strict();

export const AuthResponseSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(1, { message: "Tên đăng nhập không được trống." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  fullName: z.string().nullable(),
  address: z.string().nullable(),
  roleName: z.string().min(1, { message: "Vai trò không được trống." }),
  token: z.string().min(1, { message: "Token không được trống." }),
  refreshToken: z
    .string()
    .min(1, { message: "Refresh token không được trống." }),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type TRegisterRequest = z.TypeOf<typeof RegisterSchema>;

export type TLoginRequest = z.TypeOf<typeof LoginSchema>;

export type TAuthResponse = z.TypeOf<typeof AuthResponseSchema>;
