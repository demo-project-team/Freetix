import express from 'express';
import { getUser } from '../controller/user/getUser.controller';
import { jwtVerifyMiddleware } from '../middleware/auth/jsonwebtoken';
export const UserRouter = express.Router();

UserRouter.get('/', jwtVerifyMiddleware, getUser)