import z from "zod";
import { TProductBaseResponse } from "./product-base.schema";
import { TUserResponse } from "./user.schema";

const ConsignmentSchema = z.object({
  isConsignment: z.boolean().default(false),
  supplier: z.string().optional(),
  commission: z.coerce
    .number()
    .min(0, { message: "Commission cannot be negative" })
    .max(100, { message: "Commission cannot exceed 100%" })
    .optional(),
});

export const ProductSchema = z.object({
  productBase: z.string().min(1, { message: "Product Base ID is required" }),

  size: z.enum(["S", "M", "L"], {
    message: "Size must be S, M, or L",
  }),

  descriptionSize: z
    .string()
    .min(1, { message: "Description size is required" }),
  // .regex(/^\d+(-\d+)?\s*cm$/, {
  //   message: "Size description should be like '3-6 cm' or '10 cm'",
  // }),

  age: z.coerce
    .number()
    .min(0, { message: "Age cannot be negative" })
    .max(50, { message: "Age cannot exceed 50 years" }),

  gender: z.enum(["Male", "Female"], {
    message: "Gender must be either Male or Female",
  }),

  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),

  consignment: ConsignmentSchema.optional(),

  status: z
    .enum(["Available", "Sold", "Pending", "Not for Sale"], {
      message: "Status must be Available, Sold, Pending, or Not for Sale",
    })
    .default("Available"),

  stock: z.coerce
    .number()
    .min(0, { message: "Stock cannot be negative" })
    .default(0),
});

// Schema for updating Product
export const UpdateProductSchema = z.object({
  _id: z.string().min(1, { message: "Product ID is required" }),
  productBase: z
    .string()
    .min(1, { message: "Product Base ID is required" })
    .optional(),

  size: z
    .enum(["S", "M", "L"], {
      message: "Size must be S, M, or L",
    })
    .optional(),

  descriptionSize: z
    .string()
    .min(1, { message: "Description size is required" })
    .regex(/^\d+(-\d+)?\s*cm$/, {
      message: "Size description should be like '3-6 cm' or '10 cm'",
    })
    .optional(),

  age: z.coerce
    .number()
    .min(0, { message: "Age cannot be negative" })
    .max(50, { message: "Age cannot exceed 50 years" })
    .optional(),

  gender: z
    .enum(["Male", "Female"], {
      message: "Gender must be either Male or Female",
    })
    .optional(),

  price: z.coerce
    .number()
    .min(1, { message: "Price must be at least 1" })
    .optional(),

  status: z
    .enum(["Available", "Sold", "Pending", "Not for Sale"], {
      message: "Status must be Available, Sold, Pending, or Not for Sale",
    })
    .optional(),

  stock: z.coerce
    .number()
    .min(0, { message: "Stock cannot be negative" })
    .optional(),
});

export type TUpdateProductRequest = z.TypeOf<typeof UpdateProductSchema>;
export type TProductRequest = z.TypeOf<typeof ProductSchema>;
export type TProductResponse = z.TypeOf<typeof ProductSchema> & {
  _id: string;
  productBase: TProductBaseResponse;
  consignment?: {
    supplier: TUserResponse;
  } & z.TypeOf<typeof ConsignmentSchema>;
  createdAt?: Date;
  updatedAt?: Date;
};
