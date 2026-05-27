import { z } from "zod";

export const signupValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name cannot exceed 30 characters"),

    email: z.email(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.email(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  }),
});