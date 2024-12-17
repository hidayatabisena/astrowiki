import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import glob from 'fast-glob';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateSearchIndex() {
  const pagesDir = join(__dirname, '../pages/wiki');
  const outputPath = join(__dirname, '../../public/search-index.json');

  // Find all markdown files
  const files = await glob('*.md', { cwd: pagesDir });

  // Read and parse each file
  const pages = await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(join(pagesDir, file), 'utf-8');
      const { data: frontmatter } = matter(content);
      
      return {
        url: `/wiki/${file.replace('.md', '')}`,
        frontmatter: {
          title: frontmatter.title,
          category: frontmatter.category,
        },
      };
    })
  );

  // Write the search index
  await fs.writeFile(outputPath, JSON.stringify(pages, null, 2));
  console.log('Search index generated successfully!');
}

generateSearchIndex().catch(console.error);
