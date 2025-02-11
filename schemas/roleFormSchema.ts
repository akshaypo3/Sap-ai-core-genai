"use client"

import { z } from "zod"

export const roleFormSchema = z.object({
  role: z
  .string()
  .min(3,{
    message: "Name must be at least 3 characters.",
  })
  .regex(/^[A-Za-z\s]+$/, {
    message: "Name must only contain letters and spaces.",
  }),
  description:z.string().optional(),
})
