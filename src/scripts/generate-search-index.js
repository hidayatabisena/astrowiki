import { getCollection } from 'astro:content';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

async function generateSearchIndex() {
  try {
    // Get all wiki entries
    const wikiEntries = await getCollection('wiki');
    
    // Create search index
    const searchIndex = wikiEntries.map(entry => ({
      title: entry.data.title,
      slug: entry.slug,
      category: entry.data.category,
      url: `/wiki/${entry.slug}`,
    }));

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
