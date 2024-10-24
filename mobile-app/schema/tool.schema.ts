import { z } from "zod";

export const toolSchema = z.object({
  id: z.string(),
  artName: z.string(),
  price: z.number(),
  description: z.string(),
  glassSurface: z.boolean(),
  image: z.string(),
  brand: z.string(),
  limitedTimeDeal: z.number(),
  comments: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        rating: z.number().min(1).max(5),
        comment: z.string(), // Thay đổi từ `content` thành `comment`
        createdAt: z.string(),
      })
    )
    .optional(), // Nếu có sản phẩm không có comment, bạn có thể dùng optional()
});

export const toolsArraySchema = z.array(toolSchema);

// Loại bỏ trường 'id' trong `toolRequest` vì nó được sinh ra tự động khi thêm mới
export type toolRequest = Omit<z.infer<typeof toolSchema>, "id">;

// `toolResponse` giữ nguyên toàn bộ schema bao gồm cả `id`
export type toolResponse = z.infer<typeof toolSchema>;
