import clsx from 'clsx';
import { group } from 'console';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  search?: string;
  group?: string;
  page: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const Pagination: FC<Props> = ({ search, group, page, isFirstPage, isLastPage }) => {
  return (
    <section className="flex flex-row gap-x-4 pt-8 justify-center">
      <Link
        href={{
          pathname: '/blog-posts',
          query: {
            ...(search ? { search } : {}),
            ...(group ? { group } : {}),
            page: !isFirstPage ? page - 1 : 1,
          },
        }}
        className={clsx(
          'rounded border border-gray-300 px-4 py-2 w-32 text-center hover:bg-slate-200 active:bg-slate-300',
          {
            'text-gray-500 pointer-events-none opacity-50': isFirstPage,
          },
        )}
      >
        Previous
      </Link>
      <Link
        href={{
          pathname: '/blog-posts',
          query: {
            ...(search ? { search } : {}),
            ...(group ? { group } : {}),
            page: page + 1,
          },
        }}
        className={clsx(
          'rounded border border-gray-300 px-4 py-2 w-32 text-center hover:bg-slate-200 active:bg-slate-300',
          {
            'text-gray-500 pointer-events-none opacity-50': isLastPage,
          },
        )}
      >
        Next
      </Link>
    </section>
  );
};

export default Pagination;
