import { z } from "zod";

export const questionColumnFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is required." })
    .max(20, { message: "Name must be less than 20 characters." }),
  questionId: z.string().optional(),
});
