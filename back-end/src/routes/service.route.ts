import express from 'express';
import { getService } from '../controller/service/getService.controller';
import { postService } from '../controller/service/postService.controller';
import { z } from 'zod';
import { validate } from '../middleware/auth/validate';
import { putService } from '../controller/service/putService.controller';

const serviceSchema = z.object({
  name: z.string().min(1, 'name is required'),
  description: z.string().optional(),
  durationMinutes: z.number(),
  price: z.number(),
  imageUrl: z.string().optional(),
});
export const ServiceRouter = express.Router();
ServiceRouter.get('', getService);
ServiceRouter.post('', validate(serviceSchema), postService);
ServiceRouter.put('/:id', validate(serviceSchema), putService)
