import z from "zod";

// Schema for Feedback
export const FeedbackSchema = z.object({
  user: z.string().min(1, { message: "User ID is required" }),
  product: z.string().min(1, { message: "Product ID is required" }),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" }),
  comment: z.string().optional(), // Optional comment field
  status: z.enum(["Pending", "Approved", "Rejected"]).optional(), // Status is optional
  date: z.date().optional(), // Optional date field
});

// RequestUpdate
export const UpdateFeedbackSchema = z.object({
  _id: z.string().min(1, { message: "Feedback ID is required" }),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" })
    .optional(), // Optional rating field
  comment: z.string().optional(), // Optional comment field
  status: z.enum(["Pending", "Approved", "Rejected"]).optional(), // Optional status
});

// Create TypeScript types from the schema
export type TFeedbackRequest = z.TypeOf<typeof FeedbackSchema>;
export type TUpdateFeedbackRequest = z.TypeOf<typeof UpdateFeedbackSchema>;
export type TFeedbackResponse = z.TypeOf<typeof FeedbackSchema> & {
  _id?: string; // Optional field for the feedback ID
  createdAt?: Date; // Optional field for created date
  updatedAt?: Date; // Optional field for updated date
};
