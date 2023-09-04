'use client';

import { useRouter } from 'next/navigation';
import qs from 'qs';
import { FC, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { db } from '@/app/api/posts/db';

const Search: FC<{ search?: string; group?: string }> = ({ search, group: initialGroup }) => {
  const router = useRouter();
  const [query, setQuery] = useState(search);
  const [group, setGroup] = useState(initialGroup);
  const [debouncedQuery] = useDebounce(query, 500);

  const isInitialMount = useRef(true);

  useEffect(() => {
    // Don't re-define the query on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!debouncedQuery && !group) {
      router.push(`/blog-posts`);
    } else {
      const queryString = qs.stringify({
        ...(debouncedQuery ? { search: debouncedQuery } : {}),
        ...(group ? { group: group } : {}),
      });

      router.push(`/blog-posts?${queryString}`);
    }
  }, [debouncedQuery, group, router]);

  return (
    <div className="flex flex-row w-80 lg:w-4/12 py-4 gap-4">
      <input
        className="rounded-lg border border-gray-300 p-2 text-black w-full"
        type="text"
        placeholder="Type to search the post"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        className="rounded-lg border border-gray-300 text-black w-auto"
      >
        <option value="">All</option>
        {db.categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
