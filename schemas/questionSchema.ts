import { z } from "zod";

export const questionSchema = z.object({
  section_code: z.string().min(1, "Section Code is required"),
  question_code: z.string().min(1, "Question Code is required"),
  question_text: z.string().min(1, "Question Text is required"),
  question_type: z.enum(["text", "number", "date"], { errorMap: () => ({ message: "Please select a valid question type" }) }),
  order_index: z.string().regex(/^\d+$/, "Order Index must be a valid number"),
});
