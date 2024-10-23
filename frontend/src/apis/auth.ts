"use server";

import { httpBag, httpServer } from "@/lib/http";
import {
  TLoginRequest,
  TAuthResponse,
  TRegisterRequest,
} from "@/schema/auth.schema";

const checkLogin = async (body: TLoginRequest) => {
  return httpBag.post<TAuthResponse>("/auth/login", body);
};

const register = async (body: TRegisterRequest) => {
  const response = await httpBag.post<TAuthResponse>("/auth/register", body);
  return response;
};

export { checkLogin, register };
