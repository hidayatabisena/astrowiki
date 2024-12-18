import { writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function generateSearchIndex() {
  try {
    // Get absolute path to wiki directory
    const wikiDir = resolve(__dirname, '../../src/pages/wiki');
    
    // Read all markdown files
    const files = readdirSync(wikiDir)
      .filter(file => file.endsWith('.md'));
    
    // Create search index
    const searchIndex = files.map(file => {
      const content = readFileSync(join(wikiDir, file), 'utf-8');
      const { data } = matter(content);
      const slug = file.replace('.md', '');
      
      return {
        title: data.title,
        slug,
        category: data.category,
        url: `/wiki/${slug}`,
      };
    });

    // Determine the output directory based on environment
    const outputDir = process.env.VERCEL 
      ? '/tmp' // Use Vercel's temp directory
      : join(process.cwd(), 'public');

    // Create the output directory if it doesn't exist
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Write the search index to a JSON file
    const outputPath = join(outputDir, 'search-index.json');
    writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

    console.log(`Search index generated successfully at ${outputPath}`);
  } catch (error) {
    console.error('Error generating search index:', error);
    process.exit(1);
  }
}

generateSearchIndex();
