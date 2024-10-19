import z from "zod";
import { TCategoryResponse } from "./category.schema";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  category: z.string().min(1, { message: "Category ID is required" }),

  age: z
    .number()
    .min(0, { message: "Age cannot be negative" })
    .max(50, { message: "Age cannot exceed 50 years" }),

  origin: z.string().min(1, { message: "Origin is required" }),

  gender: z.enum(["Male", "Female"], {
    message: "Gender must be either Male or Female",
  }),

  size: z
    .number()
    .min(10, { message: "Size must be at least 10 cm" })
    .max(100, { message: "Size cannot exceed 100 cm" }),

  breed: z.string().min(1, { message: "Breed is required" }),

  personality: z
    .string()
    .max(100, {
      message: "Personality description cannot exceed 100 characters",
    })
    .optional(),

  dailyFeedAmount: z
    .number()
    .min(1, { message: "Daily feed amount must be at least 1 gram" })
    .max(500, { message: "Daily feed amount cannot exceed 500 grams" })
    .optional(),

  screeningRate: z
    .number()
    .min(0, { message: "Screening rate must be at least 0%" })
    .max(100, { message: "Screening rate cannot exceed 100%" })
    .optional(),

  healthStatus: z.string().min(1, { message: "Health status is required" }),

  imageUrl: z
    .string()
    .regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/, {
      message:
        "Please enter a valid image URL (must end with .png, .jpg, .jpeg, .gif)",
    })
    .optional(),

  price: z.number().min(1, { message: "Price must be at least 1" }),

  available: z.boolean().optional(),

  status: z
    .enum(["Available", "Sold", "Pending", "Not for Sale"], {
      message: "Status must be Available, Sold, Pending, or Not for Sale",
    })
    .optional(),

  isImportedPurebred: z.boolean().default(false).optional(),

  isF1Hybrid: z.boolean().default(false).optional(),

  isPureVietnamese: z.boolean().default(false).optional(),
});

// Schema cho cập nhật Product
export const UpdateProductSchema = z.object({
  _id: z.string().min(1, { message: "Product ID is required" }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .optional(), // Có thể bỏ qua trường này nếu không cần cập nhật

  category: z
    .string()
    .min(1, { message: "Category ID is required" })
    .optional(),

  age: z
    .number()
    .min(0, { message: "Age cannot be negative" })
    .max(50, { message: "Age cannot exceed 50 years" })
    .optional(),

  origin: z.string().min(1, { message: "Origin is required" }).optional(),

  gender: z
    .enum(["Male", "Female"], {
      message: "Gender must be either Male or Female",
    })
    .optional(),

  size: z
    .number()
    .min(10, { message: "Size must be at least 10 cm" })
    .max(100, { message: "Size cannot exceed 100 cm" })
    .optional(),

  breed: z.string().min(1, { message: "Breed is required" }).optional(),

  personality: z
    .string()
    .max(100, {
      message: "Personality description cannot exceed 100 characters",
    })
    .optional(),

  dailyFeedAmount: z
    .number()
    .min(1, { message: "Daily feed amount must be at least 1 gram" })
    .max(500, { message: "Daily feed amount cannot exceed 500 grams" })
    .optional(),

  screeningRate: z
    .number()
    .min(0, { message: "Screening rate must be at least 0%" })
    .max(100, { message: "Screening rate cannot exceed 100%" })
    .optional(),

  healthStatus: z
    .string()
    .min(1, { message: "Health status is required" })
    .optional(),

  imageUrl: z
    .string()
    .regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/, {
      message:
        "Please enter a valid image URL (must end with .png, .jpg, .jpeg, .gif)",
    })
    .optional(),

  price: z.number().min(1, { message: "Price must be at least 1" }).optional(),

  available: z.boolean().optional(),

  status: z
    .enum(["Available", "Sold", "Pending", "Not for Sale"], {
      message: "Status must be Available, Sold, Pending, or Not for Sale",
    })
    .optional(),

  isImportedPurebred: z.boolean().optional(),

  isF1Hybrid: z.boolean().optional(),

  isPureVietnamese: z.boolean().optional(),
});

export type TUpdateProductRequest = z.TypeOf<typeof UpdateProductSchema>;
export type TProductRequest = z.TypeOf<typeof ProductSchema>;
export type TProductResponse = z.TypeOf<typeof ProductSchema> & {
  _id: string;
  category: TCategoryResponse;
  createdAt?: Date;
  updatedAt?: Date;
};
