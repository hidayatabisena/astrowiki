import { useState, useEffect } from 'react';
import searchIndex from '../search-index.json';

interface WikiPage {
  snippet: any;
  url: string;
  title: string;
  category?: string;
  content: string;
  slug: string;
}

declare global {
  interface Window {
    wikiPages: WikiPage[];
  }
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WikiPage[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getContentSnippet = (content: string, searchQuery: string, snippetLength: number = 100) => {
    const lowerContent = content.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);
    
    if (index === -1) return '';
    
    const start = Math.max(0, index - snippetLength / 2);
    const end = Math.min(content.length, index + searchQuery.length + snippetLength / 2);
    let snippet = content.slice(start, end);
    
    // Add ellipsis if we're not at the start/end
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';
    
    return snippet;
  };

  useEffect(() => {
    if (query) {
      const filteredResults = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.category?.toLowerCase().includes(query.toLowerCase()) || 
        item.content.toLowerCase().includes(query.toLowerCase())
      ).map(item => ({
        ...item,
        url: item.url || (item.slug ? `/wiki/${item.slug}` : 'default-url'), // Provide a default URL if missing
        snippet: getContentSnippet(item.content, query)
      }));
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative w-full">
      <input 
        type="text" 
        placeholder="Search wiki..." 
        value={query} 
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      {isOpen && results.length > 0 && (
        <ul className="absolute w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {results.map((result, index) => (
            <li key={index} className="p-3 hover:bg-gray-100 border-b last:border-b-0">
              <a href={result.url} className="block">
                <div className="font-medium text-gray-900">{result.title}</div>
                {result.category && (
                  <div className="text-sm text-gray-600 mt-1">
                    {result.category}
                  </div>
                )}
                {result.snippet && (
                  <div className="text-sm text-gray-600 mt-1">
                    {result.snippet}
                  </div>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}