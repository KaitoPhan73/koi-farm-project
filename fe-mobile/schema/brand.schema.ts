import { z } from "zod";

export const brandResponse = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const brandArraySchema = z.array(brandResponse);
