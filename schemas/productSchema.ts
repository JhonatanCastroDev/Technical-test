// utils/productSchema.ts
import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string().url(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});
export const categoriesSchema = z.string().array()

export type Product = z.infer<typeof productSchema>;
export type Categories = z.infer<typeof categoriesSchema>