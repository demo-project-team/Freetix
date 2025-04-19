import express from "express";
import { z } from "zod";
import { signUp } from "../controller/auth/sign-up.controller";
import { validate } from "../middleware/auth/validate";
import { existingUser } from "../middleware/auth/existingUser";
import { signIn } from "../controller/auth/sign-in.controller";
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string(),
  phone: z.string(),
  profileImage : z.string().optional()
});
export const AuthRouter = express.Router()
AuthRouter.post('/sign-up', validate(signInSchema), existingUser, signUp)
AuthRouter.post('/sign-in', signIn)