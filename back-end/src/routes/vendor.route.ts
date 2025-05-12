import express from 'express';
import { z } from 'zod';
import { validate } from '../middleware/auth/validate';
import { postVendor } from '../controller/vendor/postVendor.controller';
import { getVendor } from '../controller/vendor/getVendors.controller';
import { getVendorByOwner } from '../controller/vendor/getVendorByowner.controller';
import { organizationToken } from '../middleware/auth/vendorJWT';
import { putPc } from '../controller/pc/putPc.controller';
import { jwtVerifyMiddleware } from '../middleware/auth/jsonwebtoken';
import { getOneVendor } from '../controller/vendor/getVendor.controller';
import { putVendor } from '../controller/vendor/putVendor.controller';
import { addImage } from '../controller/vendor/addImage.controller';

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
const timeSchedule = z.object({
  start : z.coerce.date(),
  end : z.coerce.date()
})
export const pcSchema = z.object({
  pcIds : z.string().array(),
  timeSchedule : z.array(timeSchedule),
  roomId : z.string()
});

export const imageSchema = z.object({
  url: z.string(),
});
VendorRouter.post('', validate(vendorScema), organizationToken, postVendor);
VendorRouter.get('/owner', organizationToken, getVendorByOwner);
VendorRouter.get('', getVendor);
VendorRouter.put('/pc/:roomId', jwtVerifyMiddleware, validate(pcSchema), putPc);
VendorRouter.get('/getone/:vendorId', getOneVendor);
VendorRouter.put('/', organizationToken, validate(vendorScema), putVendor);
VendorRouter.post('/image', organizationToken, validate(imageSchema), addImage);
