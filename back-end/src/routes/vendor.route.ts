import express from 'express';
import { z } from 'zod';
import { validate } from '../middleware/auth/validate';

export const VendorRouter = express.Router();
const vendorScema = z.object({
    name : z.string(),
    description : z.string().optional(),
    location : z.string(),
    mapLat : z.string().optional(),
    mapLng : z.string().optional(),
    phone : z.string(),
    email : z.string().email(),
    imageUrl : z.string().optional(),
})
VendorRouter.post('', validate(vendorScema) )