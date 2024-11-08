import React from "react";
import { FormUpdateUser } from "./components/form-update-user";
import { getCategoryById } from "@/apis/category";
import { getUserById } from "@/apis/user";

const UpdateUser = async ({ params }: { params: { slug: string } }) => {
  const response = await getUserById(params.slug);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormUpdateUser initialData={response.payload} />
      </div>
    </>
  );
};

export default UpdateUser;
