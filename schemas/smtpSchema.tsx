import { z } from "zod";

export const smtpSchema = z.object({
  host: z.string().nonempty("Host is required"),
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
  ssl: z.enum(["true", "false"], {
    errorMap: () => ({ message: "Encryption must be selected" }),
  }),
  port: z
    .union([
      z.number().int("Port must be an integer").positive("Port must be a positive number"),
      z.string().regex(/^\d+$/, "Port must be a number").transform(Number),
    ]),
});

export type SMTPSettingsFormData = z.infer<typeof smtpSchema>;