import { defineCollection, z } from 'astro:content';

const wiki = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    snippet: z.string().optional(),
  }),
});

export const collections = {
  wiki,
};
