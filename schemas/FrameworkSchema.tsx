"use client";

import { z } from "zod";

export const frameworkSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be 5 or more characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be 5 or more characters long" }),
  isActive: z.string().nonempty({ message: "Status is required" }),
  needsAssessment: z
    .string()
    .nonempty({ message: "Materiality Assessment Needed is required" }),
  link: z.string().optional(),
});
