import z from "zod";

export const bookSchema = z.object({
  name: z.string(),
  author: z.string(),
  price: z.number(),
  bookImage: z.union([
    z.instanceof(File, { message: "Invalid file format" }),
    z.string(),
  ]),
});

export type BookSchemaType = z.infer<typeof bookSchema>;
