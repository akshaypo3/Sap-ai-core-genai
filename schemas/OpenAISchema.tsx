"use client";

import { z } from "zod";

export const openAISchema = z.object({
  api_key: z.string().min(20, "API Key is required"),
  token: z.string().min(1, "Token Limit per Month is required"),
});
