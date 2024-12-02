import { z } from "zod";

export const questionFormSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  answerType: z.enum(["Text", "MultipleChoice", "Checkbox", "Table"]),
  helpText: z.string().optional(), // Optional field for help text
  answerOptions: z.array(z.string()).optional(),
  answerOptionsTable: z.array(z.string()).optional(),
  isRequired: z.boolean(),
  minLength: z.union([z.string(), z.number()]).optional(), // minLength can be a string or number
  maxLength: z.union([z.string(), z.number()]).optional(), // maxLength can be a string or number
});
