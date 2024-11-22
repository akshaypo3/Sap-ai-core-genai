"use client";

import { z } from "zod";

export const frameworkEditorformSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Framework Name is required." })
    .max(100, { message: "Framework Name must not exceed 100 characters." }),

  description: z
    .string()
    .min(10, { message: "Description must be atleast 10 characters." })
    .max(200, { message: "Description must not exceed 200 characters." }),

  framework_type: z
    .string()
    .min(1, { message: "Framework Type is required." })
    .refine(
      (value) => ["CDP", "BRSR", "GRI", "ESRS", "SASB"].includes(value),
      { message: "Invalid Framework Type selected." }
    ),

  version: z
    .string()
    .min(1, { message: "Version is required." })
    .regex(/^[0-9]+(\.[0-9]+)?$/, {
      message: "Version must be a valid number, e.g., '1.0'.",
    }),

  reporting_year: z
    .string()
    .min(1, { message: "Reporting Year is required." })
    .regex(/^[0-9]{4}$/, {
      message: "Reporting Year must be a valid 4-digit year.",
    }),

  status: z
    .string()
    .min(1, { message: "Status is required." })
    .refine(
      (value) => ["draft", "active", "archived"].includes(value),
      { message: "Invalid Status selected." }
    ),

   userId: z
    .string()
    .optional()
});
