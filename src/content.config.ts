import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const toursCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tours" }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    subtitle: z.string(),
    destination: z.string().optional(),
    heroImage: z.string(),
    badges: z.array(z.string()).default([]),
    priceLabel: z.string().default('Consultar'),
    priceDescription: z.string().optional(),
    priceNote: z.string().optional(),
    includes: z.array(z.string()).default([]),
    excludes: z.array(z.string()).default([]),
    conditions: z.array(z.string()).default([]),
    recommendations: z.array(z.string()).default([]).optional(),
    note: z.string().optional(),
    pickupInfo: z.array(z.object({
      title: z.string(),
      times: z.array(z.object({
        time: z.string(),
        description: z.string()
      }))
    })).optional(),
    whatsappText: z.string().optional(),
  })
});

export const collections = {
  'tours': toursCollection,
  'tours-en': defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tours-en" }),
    schema: toursCollection.schema
  })
};
