import React from "react";
import { FormCreateProduct } from "../_components/form-create-product";
import { getAllProductBases } from "@/apis/product-base";

const page = async () => {
  const response = await getAllProductBases();
  return <FormCreateProduct productBases={response.payload.items} />;
};

export default page;
