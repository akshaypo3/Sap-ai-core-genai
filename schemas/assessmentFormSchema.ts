"use client";

import { z } from "zod";

export const assessmentFormSchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Year must be a 4-digit number." }) 
    .transform((val) => parseInt(val))
    .refine((val) => val >= 1000 && val <= 9999, { 
      message: "Year must be between 1000 and 9999.",
    }),
  framework: z
    .string()
    .min(1, { message: "Framework is required." }),
});
