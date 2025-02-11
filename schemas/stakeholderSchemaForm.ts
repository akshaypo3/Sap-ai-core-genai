import { z } from "zod";

export const stakeholderFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is required." })
    .max(100, { message: "Name must be less than 100 characters." }),
  description: z.string().optional(),
  groupId: z
    .string()
    .min(1, { message: "Stakeholder group is required" }),
  stakeholderInterest: z
    .string()
    .min(1, { message: "Interest level must be 1, 2, or 3." })
    .max(3, { message: "Interest level must be 1, 2, or 3." }),
  stakeholderInfluence: z
    .string()
    .min(1, { message: "Influence level must be 1, 2, or 3." })
    .max(3, { message: "Influence level must be 1, 2, or 3." }),
  stakeholderKnowledge: z
    .string()
    .min(1, { message: "Knowledge level must be 1, 2, or 3." })
    .max(3, { message: "Knowledge level must be 1, 2, or 3." }),
});
