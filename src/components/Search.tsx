import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

interface WikiPage {
  url: string;
  frontmatter: {
    title: string;
    category: string;
  };
}

export default function Search() {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WikiPage[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/search-index.json')
      .then(res => res.json())
      .then(data => setPages(data));
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fuse = new Fuse(pages, {
      keys: ['frontmatter.title', 'frontmatter.category'],
      threshold: 0.3,
    });

    setResults(fuse.search(query).map(result => result.item));
  }, [query, pages]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-64"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-base-100 shadow-lg rounded-lg p-2 z-50">
          {results.map((page, i) => (
            <a
              key={i}
              href={page.url}
              className="block p-2 hover:bg-base-200 rounded"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-medium">{page.frontmatter.title}</div>
              <div className="text-sm opacity-70">{page.frontmatter.category}</div>
            </a>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-base-100 shadow-lg rounded-lg p-4 z-50">
          No results found
        </div>
      )}
    </div>
  );
}