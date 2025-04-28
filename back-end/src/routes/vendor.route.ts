import express from 'express';
import { z } from 'zod';
import { validate } from '../middleware/auth/validate';
import { postVendor } from '../controller/vendor/postVendor.controller';
import { getVendor } from '../controller/vendor/getVendors.controller';
import { getVendorByOwner } from '../controller/vendor/getVendorByowner.controller';
import { organizationToken } from '../middleware/auth/vendorJWT';
import { putPc } from '../controller/pc/putPc.controller';

export const VendorRouter = express.Router();
const vendorScema = z.object({
  name: z.string(),
  description: z.string().optional(),
  mapLat: z.number().optional().nullable(),
  mapLng: z.number().optional().nullable(),
  phone: z.string(),
  email: z.string().email(),
  imageUrl: z.string().optional(),
});
const pcStatusSchema = z.object({
  status: z.enum(['AVAILABLE', 'BOOKED', 'IN_USE', 'MAINTENANCE']),
});
VendorRouter.post('', validate(vendorScema), organizationToken, postVendor);
VendorRouter.get('/owner', organizationToken, getVendorByOwner);
VendorRouter.get('', getVendor);
VendorRouter.put('/pc', validate(pcStatusSchema), putPc);
