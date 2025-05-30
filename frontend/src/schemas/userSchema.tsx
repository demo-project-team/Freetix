import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, "username must be at least 3 characters"),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
  profileImage: z.string().optional(),
});

export type UserRegisterInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone is required"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

export type UserLoginInput = z.infer<typeof loginSchema>;

export const organizationSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "please enter email"),
  name: z.string().min(1, "enter name"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(8, "Phone number must be at least 8 characters"),
  OrganizationRegister: z.string().min(1, "enter organization register"),
});

export type OrganizationInput = z.infer<typeof organizationSchema>;

export const organizationSchemaLogin = z.object({
  phoneOrOrganizationRegister: z.string().min(1 ,'enter phone number or register'),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type OrganizationLoginInput = z.infer<typeof organizationSchemaLogin>;

export const statusSchema = z.object({
  request: z.enum(["PENDING", "CANCELLED", "APPROVED"]),
});

export type statusInput = z.infer<typeof statusSchema>

export const adminSchema = z.object({
  email : z.string().email(),
  password : z.string()
})
export type adminInput = z.infer<typeof adminSchema>