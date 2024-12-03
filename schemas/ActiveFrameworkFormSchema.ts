import { z } from "zod";

export const activeAssessmentFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Assessment Name is required" })
    .max(100, { message: "Assessment Name must be less than 100 characters" }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Start Date must be a valid date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "End Date must be a valid date",
  }),
  framework: z.string().min(1, { message: "Framework is required" }),
  frameworkId: z.string().optional(),
});
