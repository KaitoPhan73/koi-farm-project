
import { koiArraySchema, koiResponse, koiSchema } from "@/schema/tool.schema";
import apiClient from "./apiClient";
import { ApiResponse } from "@/types/response";

const toolApi = {
  getTools: async (
    brand?: string,
    artName?: string
  ): Promise<koiResponse[]> => {
    const response: ApiResponse<koiResponse[]> = await apiClient.get(
      "kois/products",
      {
        params: {
          brand: brand,
          artName: artName,
        },
      }
    );

    return koiArraySchema.parse(response.data);
  },
  getTool: async (id: string): Promise<koiResponse> => {
    const response: ApiResponse<koiResponse> = await apiClient.get(
      `favorite-art-tools/${id}`
    );

    return koiSchema.parse(response.data);
  },
  getBrands: async (
    brand?: string
  ): Promise<{ brand: string; count: number }[]> => {
    const tools = await toolApi.getTools(brand);

    // Tạo một đối tượng để đếm số lượng cho mỗi thương hiệu
    const brandCounts: { [key: string]: number } = {};

    tools.forEach((tool) => {
      const brandName = tool.categoryId; // Giả sử mỗi tool có thuộc tính brand
      if (brandCounts[brandName]) {
        brandCounts[brandName] += 1;
      } else {
        brandCounts[brandName] = 1;
      }
    });

    // Chuyển đổi đối tượng thành mảng
    return Object.entries(brandCounts).map(([brand, count]) => ({
      brand,
      count,
    }));
  },
};

export default toolApi;
