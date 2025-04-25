import express from 'express';
import { z } from 'zod';
import { validate } from '../middleware/auth/validate';
import { postCity } from '../controller/address/postCity.controller';
import { postDistrict } from '../controller/address/postDistrict.controller';
import { postAddress } from '../controller/address/PostAddress.controller';
import { organizationToken } from '../middleware/auth/vendorJWT';
import { getCity } from '../controller/address/getCity.controller';
import { getDistrict } from '../controller/address/getDistrict.controller';
const CitySchema = z.object({
    name : z.string(),
})

export const addressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    SumOrKhoroo: z.string().min(1, "Sum or Khoroo is required"),
});
export const AddressRouter = express.Router()

AddressRouter.post('/city', validate(CitySchema), postCity)
AddressRouter.post('/district/:id', postDistrict)
AddressRouter.post('/address', validate(addressSchema), organizationToken, postAddress)
AddressRouter.get('/city', getCity)
AddressRouter.get('/district', getDistrict)