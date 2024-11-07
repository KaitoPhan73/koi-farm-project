import React from "react";
import { getProductById } from "@/apis/product";
import { FormUpdateProduct } from "./components/form-update-product";
import { getAllProductBases } from "@/apis/product-base";

const UpdateProduct = async ({ params }: { params: { slug: string } }) => {
  const product = getProductById(params.slug);
  const productBases = getAllProductBases();

  const [productRes, productBasesRes] = await Promise.all([
    product,
    productBases,
  ]);
  return (
    <>
      <div className="flex h-full flex-1 flex-col">
        <FormUpdateProduct
          initialData={productRes.payload}
          productBases={productBasesRes.payload.items}
        />
      </div>
    </>
  );
};

export default UpdateProduct;
