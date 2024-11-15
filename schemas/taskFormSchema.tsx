import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters."),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),

  assigned_to: z.string().nonempty("Assigned user is required."),

  created_by: z.string().optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).default("TODO"),

  start_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start date.",
    }),

  due_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid due date.",
    }),
});
