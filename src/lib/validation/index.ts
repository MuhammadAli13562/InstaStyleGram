import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  username: z
    .string()
    .min(5, { message: "Username must be atleast 5 characters" }),
  email: z.string().email("Must be a valid Email"),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }),
});

export const SigninValidation = z.object({
  email: z.string().email("Must be a valid Email"),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }),
});
