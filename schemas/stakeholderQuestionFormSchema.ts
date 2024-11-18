"use client"

import { z } from "zod"

export const stakeholderQuestionFormSchema = z.object({
    question: z
      .string()
      .min(30, { message: "Question is required with minimum 30 character." }),
    mandatory: z
      .boolean()
      .refine((value) => value === true || value === false, {
        message: "Please select whether the question is mandatory or not.",
      }), 
  });