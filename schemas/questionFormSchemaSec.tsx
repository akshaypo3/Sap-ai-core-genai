import { z } from "zod";

export const questionFormSecSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  answerType: z.enum(["Text", "MultipleChoice", "Checkbox", "Table"]),
  helpText: z.string().optional(), // Optional field for help text
  answerOptions: z.array(z.string()).optional(),
  answerOptionsTable: z.array(z.string()).optional(),
  isRequired: z.boolean(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  section: z
    .object({
      section_id: z.string().min(1, "Section ID is required"),
      section_code: z.string().min(1, "Section code is required"),
      section_name: z.string().min(1, "Section name is required"),
    })
    .optional(),
});
