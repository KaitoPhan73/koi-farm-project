import { httpServer } from "@/lib/http";
import { TAuthResponse } from "@/schema/auth.schema";

const authClient = {
  auth: async (body: { user: TAuthResponse; expireTime: number }) => {
    return httpServer.post("/api/auth", body);
  },
  logoutFromNextClientToNextServer: async (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) => {
    return httpServer.post<any>(
      "/api/auth/logout",
      {
        force,
      },
      {
        baseUrl: "",
        signal,
      }
    );
  },
};
export default authClient;
