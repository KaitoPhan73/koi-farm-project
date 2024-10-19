import React from "react";
import { getProductById } from "@/apis/product";
import { FormUpdateProduct } from "./components/form-update-product";

const UpdateCategory = async ({ params }: { params: { slug: string } }) => {
  const response = await getProductById(params.slug);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormUpdateProduct initialData={response.payload} />
      </div>
    </>
  );
};

export default UpdateCategory;
