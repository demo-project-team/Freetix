import express from 'express';
import { putOrg } from '../controller/organization/putOrg.controller';
import { validate } from '../middleware/auth/validate';
import { z } from 'zod';
import { getOrg } from '../controller/organization/getorg.controller';
const statusSchema = z.object({
  request: z.enum(['PENDING', 'CANCELLED', 'APPROVED']),
});
export const OrganizationRouter = express.Router();
OrganizationRouter.put('/:id', validate(statusSchema), putOrg);
OrganizationRouter.get('/', getOrg)
