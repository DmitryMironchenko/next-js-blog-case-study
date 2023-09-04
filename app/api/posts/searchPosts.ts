import { Post } from '@/types';

import { db } from './db';

export interface SearchPostsProps {
  search: string;
  group: string | undefined;
  page: number;
  limit: number;
}

export interface SearchPostsResult {
  data: Post[];
  total: number;
}

function getCategoryIdBySlug(slug: string) {
  return db.categories.find((category) => category.slug.toLowerCase() === slug.toLowerCase())?.id;
}

export const searchPosts: (props: SearchPostsProps) => Promise<SearchPostsResult> = async ({
  search,
  group,
  page,
  limit,
}) => {
  // If qe got empty qery, return all posts (paginated), otherwise filter posts by query (also paginated)
  const rawResults = db.posts.filter((post) => {
    const isHitByText =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());

    const categoryId = group && getCategoryIdBySlug(group);
    const isHitByCategory = !group || (categoryId && (post.categories as unknown as number[]).includes(categoryId));

    return isHitByText && isHitByCategory;
  });

  // Post.fromJSON()
  const results = rawResults
    .map(
      (post) =>
        ({
          ...post,
          categories: post.categories.map((category) => db.categories.find((c) => c.id === category)),
        }) as Post,
    )
    .slice((page - 1) * limit, page * limit);

  return {
    data: results,
    total: rawResults.length,
  };
};
