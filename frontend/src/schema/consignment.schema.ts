import z from "zod";

// Schema cho Consignment
export const ConsignmentSchema = z.object({
  user: z.string().min(1, { message: "User ID is required" }), // ID người dùng
  orderItem: z.string().min(1, { message: "Order Item ID is required" }), // ID sản phẩm trong đơn hàng
  sentDate: z.date().optional(), // Ngày ký gửi (tùy chọn)
  returnDate: z.date().optional(), // Ngày trả lại (tùy chọn)
  status: z.enum(["Pending", "Accepted", "Under Care", "Returned"]).optional(), // Trạng thái (tùy chọn)
});

// Schema cho việc cập nhật Consignment
export const UpdateConsignmentSchema = z.object({
  _id: z.string().min(1, { message: "Consignment ID is required" }), // ID ký gửi
  returnDate: z.date().optional(),
  status: z.enum(["Pending", "Accepted", "Under Care", "Returned"]).optional(), // Trạng thái (tùy chọn)
});

// Tạo loại dữ liệu từ schema
export type TCreateConsignmentRequest = z.TypeOf<typeof ConsignmentSchema>;
export type TUpdateConsignmentRequest = z.TypeOf<
  typeof UpdateConsignmentSchema
>;
export type TConsignmentResponse = z.TypeOf<typeof ConsignmentSchema> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
