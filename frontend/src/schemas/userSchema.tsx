import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, 'username must be at least 3 characters')
,  phone: z.string().min(8, 'Phone number must be at least 8 characters'),
  profileImage: z.string().optional(),
});

export type UserRegisterInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone is required"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

export type UserLoginInput = z.infer<typeof loginSchema>;
