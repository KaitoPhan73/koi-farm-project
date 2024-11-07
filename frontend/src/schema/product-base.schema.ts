import z from "zod";
import { TCategoryResponse } from "./category.schema";

export const ProductBaseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  category: z.string().min(1, { message: "Category ID is required" }),

  breed: z.string().min(1, { message: "Breed is required" }),

  origin: z.string().min(1, { message: "Origin is required" }),

  personality: z
    .string()
    .max(100, {
      message: "Personality description cannot exceed 100 characters",
    })
    .optional(),

  imageUrl: z
    .string()
    .regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/, {
      message:
        "Please enter a valid image URL (must end with .png, .jpg, .jpeg, .gif)",
    })
    .optional(),

  basePrice: z.coerce
    .number()
    .min(1, { message: "Base price must be at least 1" }),

  stock: z.coerce
    .number()
    .min(0, { message: "Stock cannot be negative" })
    .default(0),
});

export type TProductBaseRequest = z.TypeOf<typeof ProductBaseSchema>;
export type TProductBaseResponse = z.TypeOf<typeof ProductBaseSchema> & {
  _id: string;
  category: TCategoryResponse;
  createdAt?: Date;
  updatedAt?: Date;
};
