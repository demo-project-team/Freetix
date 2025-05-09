import express from "express";
import { getReview } from "../controller/reviews/getReview.controller";
import { postReview } from "../controller/reviews/postReview.controller";



export const ReviewRouter = express.Router()



ReviewRouter.get('/review',  getReview)
ReviewRouter.post('/review', postReview)