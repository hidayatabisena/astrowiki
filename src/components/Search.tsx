import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

interface WikiPage {
  url: string;
  title: string;
  category?: string;
  content: string;
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

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fuse = new Fuse(window.wikiPages || [], {
      keys: ['title', 'category', 'content'],
      threshold: 0.3,
      includeMatches: true,
    });

    setResults(fuse.search(query).map(result => result.item).slice(0, 5));
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search wiki..."
        className="input input-bordered w-64"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && results.length > 0 && (
        <div 
          className="absolute z-50 w-96 mt-2 bg-base-100 rounded-lg shadow-lg border border-base-300"
          onMouseDown={e => e.preventDefault()}
        >
          {results.map((page, i) => (
            <a
              key={i}
              href={page.url}
              className="block p-3 hover:bg-base-200 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-medium">{page.title}</div>
              {page.category && (
                <div className="text-sm opacity-60">{page.category}</div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}