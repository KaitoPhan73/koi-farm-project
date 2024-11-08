import React from "react";
import { FormCreateProduct } from "../_components/form-create-product";
import { getAllCategories } from "@/apis/category";

const page = async () => {
  const response = await getAllCategories();
  console.log(response.payload);
  return <FormCreateProduct categories={response.payload.items} />;
};

export default page;
