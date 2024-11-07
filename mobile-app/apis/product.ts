import {
  toolResponse,
  toolsArraySchema,
  toolSchema,
} from "@/schema/tool.schema";
import apiClient from "./apiClient";
import { ApiResponse } from "@/types/response";
import { ProductSchema, TProductResponse } from "@/schema/product.schema";
import { TCategoryResponse } from "@/schema/category.schema";
import { TTableResponse } from "@/types/table";
import { TProductBaseResponse } from "@/schema/productbase.schema";

const productAPI = {
  getProducts: async (
    params?: any
  ) => {
    const response: ApiResponse<TTableResponse<TProductResponse>> = await apiClient.get(
      "products",
      {
        params,
      }
    );

    return response.data;
  },

  getProductBase: async (
    params?: any
  ) => {
    const response: ApiResponse<TTableResponse<TProductBaseResponse>> = await apiClient.get(
      "/product-bases",
      {
        params,
      }
    );

    return response.data;
  },

  getProductsById: async (
    id: string
  ) => {
    const response: ApiResponse<TProductResponse> = await apiClient.get(
      `products/${id}`,
    );

    return response.data;
  },

  getProductBaseById: async (
    id: string
  ) => {
    const response: ApiResponse<TProductBaseResponse> = await apiClient.get(
      `product-bases/${id}`,
    );

    return response.data;
  },

  getProductsByCategory: async (
    categoryId: string
  ) => {
    const response: ApiResponse<TProductResponse> = await apiClient.get(
      `products/${categoryId}`,
    );

    return response.data;
  },

  // getTool: async (id: string): Promise<toolResponse> => {
  //   const response: ApiResponse<toolResponse> = await apiClient.get(
  //     `favorite-art-tools/${id}`
  //   );

  //   return toolSchema.parse(response.data);
  // },
  getCategories: async (
    params?: any
  ) => {
    const response: ApiResponse<TTableResponse<TCategoryResponse>> = await apiClient.get(
      "categories",
      {
        params
      }
    );
    console.log("🚀 ~ response:", response)

    return response.data;
  },
};

export default productAPI;
