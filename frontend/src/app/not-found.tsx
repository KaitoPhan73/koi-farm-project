"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const NotFound = () => {
  const router = useRouter();
  const handleGoHome = () => {
    router.push("/");
  };
  return (
    <>
      <div className="container relative md:h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 pb-12">
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-orange-400">
                404
              </h1>
              <p className="text-sm text-muted-foreground">
                Chúng tôi rất tiếc, nhưng trang không tìm thấy bạn yêu cầu
              </p>
              <Button onClick={handleGoHome}>Về Trang chủ</Button>
            </div>
          </div>
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex rounded-bl-[360px]">
          <div className="absolute inset-0">
            <Image
              src="/images/not-found.jpg"
              alt="Image"
              fill
              style={{ objectFit: 'cover' }} 
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-bl-[360px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default NotFound;
