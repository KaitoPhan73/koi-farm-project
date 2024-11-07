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
    .max(100, { message: "Personality description cannot exceed 100 characters" })
    .optional(),

  imageUrl: z
    .string()
    .regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/, {
      message: "Please enter a valid image URL (must end with .png, .jpg, .jpeg, .gif)",
    })
    .optional(),

  basePrice: z.coerce
    .number()
    .min(1, { message: "Base price must be at least 1" }),

  size: z.coerce
    .number()
    .min(10, { message: "Size must be at least 10 cm" })
    .max(100, { message: "Size cannot exceed 100 cm" }),

  age: z.coerce
    .number()
    .min(0, { message: "Age cannot be negative" })
    .max(50, { message: "Age cannot exceed 50 years" }),

  gender: z.enum(["Male", "Female"], { message: "Gender must be either Male or Female" }),

  stock: z.coerce
    .number()
    .min(0, { message: "Stock cannot be negative" })
    .max(50, { message: "Stock cannot exceed 50" }),

  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),

  status: z
    .enum(["Available", "Sold", "Pending", "Not for Sale"], {
      message: "Status must be Available, Sold, Pending, or Not for Sale",
    })
    .optional(),
});

export type TProductBaseRequest = z.TypeOf<typeof ProductBaseSchema>;

export type TProductBaseResponse = z.TypeOf<typeof ProductBaseSchema> & {
  _id: string;
  category: TCategoryResponse; 
  createdAt?: Date;
  updatedAt?: Date;
};
