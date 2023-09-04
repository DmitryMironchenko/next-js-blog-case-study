import { FC } from 'react';

import { SearchPostsResult } from '../api/posts/searchPosts';
import Pagination from './pagination';
import PostItem from './post';

interface Props {
  search: string;
  group?: string;
  page: number;
}

async function getPosts(args: { search: string; group: string | undefined; page: number }) {
  const res = await fetch(`${process.env.API_HOST}/api/posts`, {
    method: 'POST',
    body: JSON.stringify(args),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<SearchPostsResult>;
}

const Posts: FC<Props> = async ({ search, group, page }) => {
  const { data: posts, total } = await getPosts({ search, group, page });
  const isLastPage = page * 3 >= total;

  return (
    <section className="container md mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:items-stretch">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      <Pagination search={search} group={group} page={page} isFirstPage={page === 1} isLastPage={isLastPage} />
    </section>
  );
  return null;
};

export default Posts;
