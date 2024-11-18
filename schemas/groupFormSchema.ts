"use client"

import { z } from "zod"

export const groupFormSchema = z.object({
  name: z
  .string()
  .min(3,{
    message: "Name must be at least 3 characters.",
  })
  .regex(/^[A-Za-z\s]+$/, {
    message: "Name must only contian letters and spaces.",
  }),
  description:z.string().min(20,{
    message: "Description must be at least 20 characters.",
  })
})
