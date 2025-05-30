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
import { getUserProfile } from '../controller/auth/getUserPorifile.controller';
import { logoutUser } from '../controller/auth/logoutUser.controller';
import { logoutVendor } from '../controller/auth/logoutVendor.controller';
import { signUpOrgMany } from '../controller/auth/postManyUser';
import { admin, adminLogin} from '../controller/auth/adminLogin.controller';
import { adminMiddleware } from '../middleware/auth/admin';

declare global {
  namespace Express {
    interface User {
      id: string;
      displayName: string;
      emails: { value: string }[];
      provider?: string;
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
      callbackURL:
        process.env.NODE_ENV === 'production'
          ? 'https://freetix-d0gf.onrender.com/auth/google/callback'
          : 'http://localhost:5000/auth/google/callback',
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
        provider: 'google',
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
      callbackURL: 'https://freetix-d0gf.onrender.com/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'emails', 'name'],
    },
    (accessToken: string, refreshToken: string, profile, done) => {
      const emails =
        profile.emails?.map((email) => ({
          value: email.value,
          verified: true,
        })) || [];

      const user: Express.User = {
        id: profile.id,
        displayName: profile.displayName,
        emails,
        provider: 'facebook',
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
  passport.authenticate('google', { failureRedirect: '/', failureMessage: true }),
  loginGoogle,
);
AuthRouter.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
);
AuthRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  signUpFacebook,
);
AuthRouter.get('/profile', getUserProfile);
AuthRouter.post('/logout/user', logoutUser)
AuthRouter.post('/logout/vendor', logoutVendor)
AuthRouter.post('/createmany',signUpOrgMany)
AuthRouter.get('/admin', adminMiddleware, admin)
AuthRouter.post('/admin', adminLogin)