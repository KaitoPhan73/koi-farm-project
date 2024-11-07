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
import { TPaymentResponse } from "@/schema/payment.schema";
  
  const paymentAPI = {
    createPayment: async (amount: number, currency: string) => {
        try {
          const response: ApiResponse<TPaymentResponse> = await apiClient.post(
            "/stripe/create-payment", 
            {
              amount,
              currency,
            }
          );
    
          return response.data;
        } catch (error) {
          console.error("Error creating payment:", error);
          throw new Error("Payment creation failed");
        }
    }
  };
  
  export default paymentAPI;
  