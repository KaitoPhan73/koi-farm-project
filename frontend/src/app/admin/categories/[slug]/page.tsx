import React from "react";
import { FormUpdateCategory } from "./components/form-update-category";
import { getCategoryById } from "@/api/category";

const UpdateCategory = async ({ params }: { params: { slug: string } }) => {
  const response = await getCategoryById(params.slug);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormUpdateCategory initialData={response.payload} />
      </div>
    </>
  );
};

export default UpdateCategory;
