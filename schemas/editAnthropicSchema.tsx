import { z } from "zod";

export const editAnthropicSchema = z.object({
  API_Key: z.string().nonempty("API Key is required"),
  Model: z.string().nonempty("Model is required"),
  Token_Limit_per_Month: z
    .number()
    .int("Token Limit must be an integer")
    .positive("Token Limit must be greater than 0"),
});

export type EditAnthropicFormData = z.infer<typeof editAnthropicSchema>;
