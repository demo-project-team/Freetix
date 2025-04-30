/* eslint-disable @typescript-eslint/no-namespace */
import express from 'express';
import { z } from 'zod';
import { signUp } from '../controller/auth/sign-up.controller';
import { validate } from '../middleware/auth/validate';
import { existingUser } from '../middleware/auth/existingUser';
import { signIn } from '../controller/auth/sign-in.controller';
import { signUpOrg } from '../controller/auth/organizationSign-up.controller';
import { existingOrg } from '../middleware/auth/existingOrg';
import { signInOrg } from '../controller/auth/organizationSign-in.controller';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import 'dotenv/config';
import { loginGoogle } from '../controller/auth/signUpWithgoogle.controller';
import { signUpFacebook } from '../controller/auth/signUpWithFacebook.controller';

declare global {
  namespace Express {
    interface User {
      id: string;
      displayName: string;
      emails: { value: string }[];
    }
  }
}

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string(),
  phone: z.string(),
  profileImage: z.string().optional(),
});
const loginSchema = z.object({
  emailOrPhone: z.string().min(1, 'Email or phone is required'),
  password: z.string().min(8, 'Password must be at least 6 characters'),
});
const organizationSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string().min(8),
  phone: z.string(),
  OrganizationRegister: z.string(),
});
const organizationSchemaLogin = z.object({
  phoneOrOrganizationRegister: z.string(),
  password: z.string().min(8),
});
passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});
passport.deserializeUser((id: string, done) => {
  const user: Express.User = {
    id,
    displayName: 'Sample Name',
    emails: [{ value: 'sample@example.com' }],
  }; // Replace with actual user lookup
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken);
      const emails =
        profile.emails?.map((email) => ({
          value: email.value,
          verified: email.verified ?? false,
        })) || [];
      const user: Express.User = {
        id: profile.id,
        displayName: profile.displayName,
        emails: emails,
      };
      return done(null, user);
    },
  ),
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.APP_ID!,
      clientSecret: process.env.APP_SECRET!,
      callbackURL: process.env.NODE_ENV === "production"
        ? 'https://freetix-d0gf.onrender.com/auth/facebook/callback'
        : 'http://localhost:5000/auth/facebook/callback',
      profileFields: ['public_profile', 'email'],
    },
    (accessToken, refreshToken, profile, done) => {
      const emails =
        profile.emails?.map((email) => ({
          value: email.value,
          verified: true,
        })) || [];

      const user: Express.User = {
        id: profile.id,
        displayName: profile.displayName,
        emails,
      };
      return done(null, user);
    },
  ),
);
export const AuthRouter = express.Router();
AuthRouter.post('/sign-up', validate(signUpSchema), existingUser, signUp);
AuthRouter.post('/sign-in', validate(loginSchema), signIn);
AuthRouter.post('/organization/sign-up', validate(organizationSchema), existingOrg, signUpOrg);
AuthRouter.post('/organization/sign-in', validate(organizationSchemaLogin), signInOrg);
AuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
AuthRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  loginGoogle,
);
AuthRouter.get('/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));
AuthRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  signUpFacebook,
);
