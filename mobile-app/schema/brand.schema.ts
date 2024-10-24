import { z } from "zod";

export const brandCountResponse = z.object({
  brand: z.string(),
  count: z.number(),
});

export const brandCountArraySchema = z.array(brandCountResponse);
