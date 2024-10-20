import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;
  const headers = new Headers();

  if (force) {
    headers.append("Set-Cookie", `accessToken=; Path=/; HttpOnly; Max-Age=0`);
    headers.append("Set-Cookie", `user=; Path=/; HttpOnly; Max-Age=0`);
    return new Response(
      JSON.stringify({ message: "Buộc đăng xuất thành công" }),
      {
        status: 200,
        headers,
      }
    );
  }

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return new Response(
      JSON.stringify({ message: "Không nhận được session token" }),
      {
        status: 401,
      }
    );
  }

  try {
    // const result = await authApi.logoutFromNextServerToServer(accessToken.value);
    headers.append("Set-Cookie", `accessToken=; Path=/; HttpOnly; Max-Age=0`);
    headers.append("Set-Cookie", `user=; Path=/; HttpOnly; Max-Age=0`);
    // return new Response(JSON.stringify(result.payload), {
    //   status: 200,
    //   headers,
    // });
  } catch (error) {
    if (error instanceof HttpError) {
      return new Response(JSON.stringify(error.payload), {
        status: error.status,
      });
    } else {
      return new Response(JSON.stringify({ message: "Lỗi không xác định" }), {
        status: 500,
      });
    }
  }
}
