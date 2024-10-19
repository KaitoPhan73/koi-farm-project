import z from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name cannot exceed 100 characters" }),

  description: z
    .string()
    .max(255, { message: "Description cannot exceed 255 characters" })
    .optional(), // Có thể bỏ qua, mặc định là ''
});

export const CategoryUpdateSchema = z.object({
  _id: z.string().min(1, { message: "Category ID is required" }),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name cannot exceed 100 characters" }),

  description: z
    .string()
    .max(255, { message: "Description cannot exceed 255 characters" })
    .optional(), // Có thể bỏ qua, mặc định là ''
});

// Tạo loại dữ liệu từ schema
export type TCategoryRequest = z.TypeOf<typeof CategorySchema>;
export type TCategoryUpdateRequest = z.TypeOf<typeof CategoryUpdateSchema>;
export type TCategoryResponse = z.TypeOf<typeof CategorySchema> & {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
