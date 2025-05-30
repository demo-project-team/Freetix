import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
});
export type categoryInput = z.infer<typeof categorySchema>;

export const vendorScema = z.object({
  name: z.string().min(1, "enter name"),
  description: z.string().optional(),
  mapLat: z
    .number()
    .min(-90, "Latitude must be at least -90")
    .nullable()
    .optional(),
  mapLng: z
    .number()
    .min(-180, "Longitude must be at least -180")
    .nullable()
    .optional(),
  phone: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email address"),
  imageUrl: z.string().optional(),
});
export type vendorInput = z.infer<typeof vendorScema>;

export const roomschema = z.object({
  name: z.string(),
  type: z.enum(["VIP", "LOBBY", "VVIP", 'STREAMER', 'STAGE', 'FPS']),
  pcPricePerHour: z.number(),
});
export type roomInput = z.infer<typeof roomschema>;

export const tableSchema = z.object({
  name: z.string().min(1, "enter name"),
  row: z.number().positive(),
  col: z.number().positive(),
});

export type tableInput = z.infer<typeof tableSchema>;

export const pcSchema = z.object({
  pcIds: z.string().array(),
  start: z.string(),
  end: z.string(),
  roomId: z.string(),
});


export type pcInput = z.infer<typeof pcSchema>;

export const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  SumOrKhoroo: z.string().min(1, "Sum or Khoroo is required"),
  districtId: z.string().min(1, "district is required"),
  cityId: z.string().min(1, "city is required"),
});

export type addressInput = z.infer<typeof addressSchema>;

export const imageSchema = z.object({
  url: z.string(),
});
export type imageInput = z.infer<typeof imageSchema>;

export const timeSchema = z.object({
  start : z.string(),
  end : z.string()
})

export type timeInput = z.infer<typeof timeSchema>