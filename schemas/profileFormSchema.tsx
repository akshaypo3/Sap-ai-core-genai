"use client";

import { z } from "zod";

export const profileSchema = z.object({
  username: z.string().min(1, "Username is required"),
  userEmail: z.string().email("Valid email is required"),
});
