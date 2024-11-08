import z from "zod";

export const PaymentSchema = z.object({
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  currency: z
    .string()
    .min(3, { message: "Currency code must be at least 3 characters" })
    .max(3, { message: "Currency code cannot exceed 3 characters" }),
  status: z.enum(["Pending", "Completed", "Failed", "Cancelled"], {
    message: "Status must be one of 'Pending', 'Completed', 'Failed', or 'Cancelled'",
  }),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  paymentDate: z.date().optional(), 
  clientSecret: z.string().optional(),
  transactionId: z.string().optional(), 
});

export type TPaymentRequest = z.TypeOf<typeof PaymentSchema>;
export type TPaymentResponse = z.TypeOf<typeof PaymentSchema> & {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};
