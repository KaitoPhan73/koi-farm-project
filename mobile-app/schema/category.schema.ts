import z from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name cannot exceed 100 characters" }),

  description: z
    .string()
    .max(255, { message: "Description cannot exceed 255 characters" })
    .optional(), 
});


export type TCategoryRequest = z.TypeOf<typeof CategorySchema>;
export type TCategoryResponse = z.TypeOf<typeof CategorySchema> & {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
};
