import express from 'express';
import { getUser } from '../controller/user/getUser.controller';
import { jwtVerifyMiddleware } from '../middleware/auth/jsonwebtoken';
import { getBooking } from '../controller/booking/getBooking.controller';
export const UserRouter = express.Router();

UserRouter.get('/', jwtVerifyMiddleware, getUser)
UserRouter.get('/booking', jwtVerifyMiddleware, getBooking)