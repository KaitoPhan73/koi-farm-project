import React from "react";
import { FormCreateProductBase } from "../_components/form-create-product-base";
import { getAllCategories } from "@/apis/category";

const page = async () => {
  const response = await getAllCategories();
  return <FormCreateProductBase categories={response.payload.items} />;
};

export default page;
