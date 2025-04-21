import { z } from "zod";

export const categorySchema = z.object({
  name: z.string(),
  icon: z.string().optional(),
});
export type categoryInput = z.infer<typeof categorySchema>;
