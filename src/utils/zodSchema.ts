import z from "zod";

export const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

export const genreSchema = z.object({
  name: z.string().min(5)
}).strict();

export const theaterSchema = z.object({
  name: z.string().min(5),
  city: z.string().min(4)
}).strict();

export const movieSchema = z.object({
  title: z.string().min(5),
  genre: z.string().min(5),
  theaters: z.array(z.string().min(5)).min(1),
  description: z.string().min(5).optional(),
  price: z.number(),
  available: z.boolean(),
  bonus: z.string().optional(),
}).strict();

