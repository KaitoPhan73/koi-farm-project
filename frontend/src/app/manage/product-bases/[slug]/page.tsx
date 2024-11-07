import React from "react";
import { getProductBaseById } from "@/apis/product-base";
import { FormUpdateProductBase } from "./components/form-update-product-base";
import { getAllCategories } from "@/apis/category";

const UpdateProductBase = async ({ params }: { params: { slug: string } }) => {
  const productBase = getProductBaseById(params.slug);
  const categories = getAllCategories();

  const [productBaseRes, categoriesRes] = await Promise.all([
    productBase,
    categories,
  ]);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormUpdateProductBase
          initialData={productBaseRes.payload}
          categories={categoriesRes.payload.items}
        />
      </div>
    </>
  );
};

export default UpdateProductBase;
