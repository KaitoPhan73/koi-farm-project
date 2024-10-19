import z from "zod";

// Schema cho Order
export const OrderSchema = z.object({
  user: z.string().min(1, { message: "user ID is required" }),
  items: z
    .array(z.string())
    .min(1, { message: "At least one item is required" }),
  totalAmount: z
    .number()
    .min(0, { message: "Total amount cannot be negative" }),
  status: z
    .enum(["Pending", "Processing", "Shipped", "Completed", "Cancelled"])
    .optional(),
  orderDate: z.date().optional(),
});

// RequestUpdate
export const UpdateOrderSchema = z.object({
  _id: z.string().min(1, { message: "Order ID is required" }),
  items: z.array(z.string()).min(1).optional(), // Có thể bỏ qua trường này nếu không cần cập nhật
  totalAmount: z.number().min(0).optional(),
  status: z
    .enum(["Pending", "Processing", "Shipped", "Completed", "Cancelled"])
    .optional(),
});

// Tạo loại dữ liệu từ schema
export type TRequestCreateOrder = z.TypeOf<typeof OrderSchema>;
export type TRequestUpdateOrder = z.TypeOf<typeof UpdateOrderSchema>;
export type TResponseOrder = z.TypeOf<typeof OrderSchema> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
