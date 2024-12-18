import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  },
  image: {
    domains: ["res.cloudinary.com"]
  }
});