import { z } from "zod";

export const goalFormSchema = z.object({
  name: z.string().min(3, "Goal Name is required"),

  description: z.string().min(25, "Description is required"),

  target_value: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Target Value must be a valid number",
    })
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val), {
      message: "Target Value must be an integer",
    })
    .refine((val) => val >= 1, {
      message: "Target Value required",
    }),

  unit_of_measure: z.string().min(1, "Unit of Measure is required"),

  start_date: z
    .string()
    .min(1, "Start Date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Start Date must be a valid date",
    }),

  end_date: z
    .string()
    .min(1, "End Date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "End Date must be a valid date",
    }),

    baseline_value: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Baseline Value must be a valid number",
    })
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val), {
      message: "Baseline Value must be an integer",
    })
    .refine((val) => val >= 1, {
      message: "Baseline Value required",
    }),

  current_value: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Current Value must be a valid number",
    })
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val), {
      message: "Current Value must be an integer",
    })
    .refine((val) => val >= 1, {
      message: "Current Value required",
    }),

  owner: z.string().min(1, "Owner is required"),

  status: z.string().optional().default("FALSE"),

  key_actions: z.string().min(1, "Key Actions are required"),

  frequency_of_measurement: z
    .string()
    .min(1, "Frequency of Measurement is required"),

  completion_date: z
    .string()
    .min(1, "Completion Date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Completion Date must be a valid date",
    }),

  risks: z.string().min(1, "Risks are required"),

  comments: z.string().min(1, "Comments are required"),

  visualization: z
    .enum(["Bar Graph", "Line Graph", "Pie Graph", "Donut Graph"])
    .optional(),
});
