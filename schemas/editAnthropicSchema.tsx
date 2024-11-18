import { z } from "zod";

export const editAnthropicSchema = z.object({
  API_Key: z.string().nonempty("API Key is required"),
  Model: z.string().nonempty("Model is required"),
  Token_Limit_per_Month: z
    .string()
    .regex(/^\d+$/, "Token Limit must be a valid number")
    .transform(Number)
    .refine((value) => value > 0, "Token limit must be greater than 0"),
});

export type EditAnthropicFormData = z.infer<typeof editAnthropicSchema>;
