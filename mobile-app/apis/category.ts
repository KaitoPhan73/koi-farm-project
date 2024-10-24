import {
  toolResponse,
  toolsArraySchema,
  toolSchema,
} from "@/schema/tool.schema";
import apiClient from "./apiClient";
import { ApiResponse } from "@/types/response";
import { TCategoryResponse } from "@/schema/category.schema";
import { TTableResponse } from "@/types/Table";

const categoryApi = {
  getCategories: async (params?: any) => {
    const response: ApiResponse<TTableResponse<TCategoryResponse>> =
      await apiClient.get("categories", {
        params,
      });
    console.log("🚀 ~ getCategories: ~ response:", response);

    return response.data;
  },
};

export default categoryApi;
