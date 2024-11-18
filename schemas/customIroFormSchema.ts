"use client"

import { z } from "zod"

export const customIroFormSchema = z.object({
  topic: z
  .string()
  .min(6,{
    message: "Topic must be at least 6 characters.",
  })
  .regex(/^[A-Za-z\s]+$/, {
    message: "Name must only contian letters and spaces.",
  }),
  sub_topic:z
  .string()
  .min(18,{
    message: "Sub Topic must be at least 18 characters.",
  })
  .regex(/^[A-Za-z\s]+$/, {
    message: "Name must only contian letters and spaces.",
  }),
  sub_sub_topic: z
  .string()
  .min(12,{
    message: "Sub Sub Topic must be at least 12 characters.",
  })
  .regex(/^[A-Za-z\s]+$/, {
    message: "Name must only contian letters and spaces.",
  }),
  assesmentId: z
  .string()
  .optional()
})
