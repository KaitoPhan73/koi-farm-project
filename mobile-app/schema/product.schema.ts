import z from "zod";
import { TCategoryResponse } from "./category.schema";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  category: z.string().min(1, { message: "Category ID is required" }),

  breed: z.string().min(1, { message: "Breed is required" }),

  origin: z.string().min(1, { message: "Origin is required" }),

  size: z.enum(["S", "M", "L"], {
    message: "Size must be S, M, or L",
  }),

  descriptionSize: z
    .string()
    .min(1, { message: "Description size is required" })
    .regex(/^\d+(-\d+)?\s*cm$/, {
      message: "Description size must be in format '3-6 cm' or '10 cm'",
    }),

  age: z.coerce
    .number()
    .min(0, { message: "Age cannot be negative" })
    .max(50, { message: "Age cannot exceed 50 years" }),

  gender: z.enum(["Male", "Female"], {
    message: "Gender must be either Male or Female",
  }),

  price: z.coerce
    .number()
    .min(1, { message: "Price must be at least 1" }),

  stock: z.coerce
    .number()
    .min(0, { message: "Stock cannot be negative" }),

  personality: z
    .string()
    .max(100, { message: "Personality cannot exceed 100 characters" })
    .optional(),

  imageUrl: z
    .string()
    .regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/, {
      message: "Please enter a valid image URL (must end with .png, .jpg, .jpeg, .gif)",
    })
    .optional(),

  consignment: z
    .object({
      isConsignment: z.boolean().default(false),
      supplier: z.string().optional(), // Assuming ObjectId will be sent as string
      commission: z.coerce
        .number()
        .min(0, { message: "Commission must be at least 0%" })
        .max(100, { message: "Commission cannot exceed 100%" })
        .optional(),
    })
    .optional(),

  status: z
    .enum(["Available", "Sold", "Pending", "Not for Sale"], {
      message: "Status must be Available, Sold, Pending, or Not for Sale",
    })
    .default("Available"),
});

export type TProductRequest = z.TypeOf<typeof ProductSchema>;
export type TProductResponse = z.TypeOf<typeof ProductSchema> & {
  _id: string;
  category: TCategoryResponse;
  createdAt?: Date;
  updatedAt?: Date;
};
