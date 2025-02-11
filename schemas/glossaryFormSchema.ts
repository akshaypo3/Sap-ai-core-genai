"use client"

import { z } from "zod"

export const glossaryFormSchema = z.object({
  title: z
  .string()
  .min(3,{
    message: "Title must be at least 3 characters.",
  })
  .regex(/^[A-Za-z\s]+$/, {
    message: "Name must only contian letters and spaces.",
  }),
  description:z.string().optional(),
  language: z
  .string()
  .optional()
})
