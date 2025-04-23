import express from "express";
import { z } from "zod";
import { signUp } from "../controller/auth/sign-up.controller";
import { validate } from "../middleware/auth/validate";
import { existingUser } from "../middleware/auth/existingUser";
import { signIn } from "../controller/auth/sign-in.controller";
import { signUpOrg } from "../controller/auth/organizationSign-up.controller";
const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string(),
  phone: z.string(),
  profileImage : z.string().optional()
});
const loginSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone is required"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});
const organizationSchema = z.object({
  email : z.string(),
  username : z.string(),
  password : z.string().min(8),
  phone : z.string(),
  OrganizationRegister : z.string()
})
export const AuthRouter = express.Router()
AuthRouter.post('/sign-up', validate(signUpSchema), existingUser, signUp)
AuthRouter.post('/sign-in',validate(loginSchema), signIn)
AuthRouter.post('/organization/sign-up', validate(organizationSchema), signUpOrg)