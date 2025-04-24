import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
});
export type categoryInput = z.infer<typeof categorySchema>;

export const vendorScema = z.object({
  name : z.string(),
  description : z.string().optional(),
  mapLat : z.number().nullable().optional(),
  mapLng : z.number().nullable().optional(),
  phone : z.string(),
  email : z.string().email(),
  imageUrl : z.string().optional(),
})
export type vendorInput = z.infer<typeof vendorScema>;