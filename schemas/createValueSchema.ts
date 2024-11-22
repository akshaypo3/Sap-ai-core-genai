import { z } from "zod";

export const createValueSchema = z.object({
  target_value: z
    .coerce
    .number()
    .int("Target Value must be an integer")
    .positive("Target Value must be greater than 0")
    .refine((val) => val > 0, {
      message: "Target Value is required and must be greater than 0",
    }),

  baseline_value: z
    .coerce
    .number()
    .int("Baseline Value must be an integer")
    .positive("Baseline Value must be greater than 0")
    .refine((val) => val >= 0, {
      message: "Baseline Value is required and must be 0 or greater",
    }),

  current_value: z
    .coerce
    .number()
    .int("Current Value must be an integer")
    .positive("Current Value must be greater than 0")
    .refine((val) => val >= 0, {
      message: "Current Value is required and must be 0 or greater",
    }),

  unit_of_measure: z
    .string()
    .min(1, { message: "Unit of Measure is required" }),

  comments: z
    .string()
    .min(1, { message: "Comments are required" }),

  status: z.string().min(1, { message: "Status is required" }), // Ensure status is required
});