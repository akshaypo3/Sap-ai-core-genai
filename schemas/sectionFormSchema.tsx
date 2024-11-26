"use client";

import { z } from "zod";

// Assuming SectionOptions is an array of options
// You can replace it with an appropriate type for parent_section_id options
type SectionOptions = { id: string; label: string };

export const sectionEditorFormSchema = z.object({
  section_code: z
    .string()
    .min(1, { message: "Section Code is required." })
    .max(20, { message: "Section Code must not exceed 20 characters." })
    .regex(/^[A-Z0-9]+(\.[0-9]+)*$/, {
      message: "Section Code must be in the format like '1.1', 'A.2', etc.",
    }),

  name: z
    .string()
    .min(1, { message: "Section Name is required." })
    .max(255, { message: "Section Name must not exceed 255 characters." }),

  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(500, { message: "Description must not exceed 500 characters." }),
    
  // parent_section_id: z
  // .string()
  //   .optional(),

  is_required: z
    .boolean()
    .default(true)
    .refine((value) => typeof value === "boolean", {
      message: "Required Section must be a boolean.",
    }),

  //   order_index: z
  // .string({ required_error: "This field is required" })
  // .min(0, { message: "Number must be at least 0" })
  // .transform((val) => parseInt(val, 10)),
  
  
 
  metadata: z
    .string()
    .max(500, { message: "Additional metadata must not exceed 500 characters." })
    .optional(), // Optional, but will enforce max length if provided
});
