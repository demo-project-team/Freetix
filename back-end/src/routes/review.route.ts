import express from 'express';
import { getReview } from '../controller/reviews/getReview.controller';
import { postReview } from '../controller/reviews/postReview.controller';
import { jwtVerifyMiddleware } from '../middleware/auth/jsonwebtoken';
import { putReview } from '../controller/reviews/putReview.controller';


export const ReviewRouter = express.Router();

ReviewRouter.get('/review', getReview);
ReviewRouter.post('/review', jwtVerifyMiddleware, postReview);
ReviewRouter.put('/review', putReview)

