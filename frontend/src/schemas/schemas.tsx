import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
});
export type categoryInput = z.infer<typeof categorySchema>;

export const vendorScema = z.object({
  name: z.string(),
  description: z.string().optional(),
  mapLat: z.number().nullable().optional(),
  mapLng: z.number().nullable().optional(),
  phone: z.string(),
  email: z.string().email(),
  imageUrl: z.string().optional(),
});
export type vendorInput = z.infer<typeof vendorScema>;

export const roomschema = z.object({
  name: z.string(),
  type: z.enum(["VIP", "STANDART"]),
});
export type roomInput = z.infer<typeof roomschema>;

export const tableSchema = z.object({
  name: z.string().min(1, "enter name"),
  row: z.number().positive(),
  col: z.number().positive(),
});

export type tableInput = z.infer<typeof tableSchema>
