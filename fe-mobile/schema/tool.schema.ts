import { z } from "zod";

export const koiSchema = z.object({
  _id: z.string(),
  name: z.string(),
  categoryId: z.string(),
  age: z.number().min(0).max(50),
  origin: z.string(),
  gender: z.enum(['Male', 'Female']),
  size: z.number().min(10).max(100),
  breed: z.string(),
  personality: z.string().max(100).optional(),
  dailyFeedAmount: z.number().min(1).max(500).optional(),
  screeningRate: z.number().min(0).max(100).optional(),
  healthStatus: z.string(),
  imageUrl: z.string().url(),
  price: z.number().min(1),
  available: z.boolean(),
  status: z.enum(['Available', 'Sold', 'Pending', 'Not for Sale']),
  isImportedPurebred: z.boolean(),
  isF1Hybrid: z.boolean(),
  isPureVietnamese: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
});

export const koiArraySchema = z.array(koiSchema);

export type koiRequest = Omit<z.infer<typeof koiSchema>, "_id">;

export type koiResponse = z.infer<typeof koiSchema>;
