"use client";
import authClient from "@/apis/client/auth";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/User/userSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const logout = async () => {
      try {
        localStorage.clear();
        sessionStorage.clear();
        dispatch(setUser(null));
        await authClient.logoutFromNextClientToNextServer(true, signal);
        router.push(`/login?redirectFrom=${pathname}`);
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        router.refresh();
      }
    };

    logout();

    return () => {
      controller.abort();
    };
  }, [router, pathname]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div className="h-screen w-screen flex flex-col items-center justify-center">
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-primary" />
          <div className="mt-4 text-lg">Đang đăng xuất...</div>
        </div>
      </div>
    </div>
  );
}

export default function LogoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LogoutLogic />
    </Suspense>
  );
}
