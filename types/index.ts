export interface Post {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: PostCategory[];
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
}
