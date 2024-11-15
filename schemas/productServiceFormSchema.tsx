import { z } from 'zod';

export const productServiceFormSchema = z.object({
    type: z.string().nonempty("Product/Service type is required"),
    name: z.string().min(3, "Product/Service name must be at least 3 characters."),
    description: z.string().min(20, "Description must be at least 20 characters."),
    turnover_percentage: z
    .number({     required_error: "This field is required",     invalid_type_error: "Must be a valid number",   })  .min(0.01, "Number must be at least 0.01")   .max(100, "Number must not exceed 100"),
  });