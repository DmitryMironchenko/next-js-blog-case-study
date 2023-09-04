import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

import { searchPosts } from './searchPosts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const querySchema = z.object({
      search: z.string(),
      group: z.string().optional(),
      page: z.number().int().positive().default(1),
      limit: z.number().int().positive().default(3),
    });

    const { search, group, page, limit } = querySchema.parse(body);

    const posts = await searchPosts({ search, group, page, limit });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    const message = error instanceof ZodError ? error.issues : (error as Error).message;
    return NextResponse.json({ message }, { status: 400 });
  }
}
