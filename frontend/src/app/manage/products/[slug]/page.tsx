import React from "react";
import { getProductById } from "@/apis/product";
import { FormUpdateProduct } from "./components/form-update-product";
import { getAllCategories } from "@/apis/category";

const UpdateProduct = async ({ params }: { params: { slug: string } }) => {
  const product = getProductById(params.slug);
  const category = getAllCategories();

  const [productRes, categoryRes] = await Promise.all([product, category]);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormUpdateProduct
          initialData={productRes.payload}
          categories={categoryRes.payload.items}
        />
      </div>
    </>
  );
};

export default UpdateProduct;
