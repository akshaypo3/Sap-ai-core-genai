"use client";

import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
  groupID: z.string().nonempty({ message: "Group is required" }),
  roleID: z.string().nonempty({ message: "Role is required" }),
});
