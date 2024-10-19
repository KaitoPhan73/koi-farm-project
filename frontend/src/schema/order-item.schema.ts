import z from "zod";

// Schema cho OrderItem
export const OrderItemSchema = z.object({
  product: z.string().min(1, { message: "Product ID is required" }),
  quantity: z
    .number()
    .min(1, { message: "Quantity must be at least 1" })
    .optional(),
  price: z.number().min(0, { message: "Price cannot be negative" }),
});

// RequestUpdate
export const RequestUpdateOrderItemSchema = z.object({
  _id: z.string().min(1, { message: "Order Item ID is required" }),
  quantity: z
    .number()
    .min(1, { message: "Quantity must be at least 1" })
    .optional(),
  price: z.number().min(0, { message: "Price cannot be negative" }).optional(),
});

// Tạo loại dữ liệu từ schema
export type TRequestCreateOrderItem = z.TypeOf<typeof OrderItemSchema>;
export type TRequestUpdateOrderItem = z.TypeOf<
  typeof RequestUpdateOrderItemSchema
>;
export type TResponseOrderItem = z.TypeOf<typeof OrderItemSchema> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
