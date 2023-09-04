import { Suspense } from 'react';

import Posts from './posts';
import Search from './search';

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const search = (searchParams.search as string) || '';
  const group = searchParams.group as string | undefined;

  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;

  return (
    <main
      className="container flex sm mx-auto min-h-screen flex-col items-center py-8"
      // key={[search, page, limit].join('')} // This is a hack to force a Suspense to show on every search
    >
      <h1 className="text-2xl pb-2 font-bold">From the Blog</h1>
      <p className="text-gray-800/50 dark:text-gray-500 pb-4 max-w-xl text-sm text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis risus non consequat maximus.
      </p>
      <Search search={search} group={group} />
      <Suspense fallback={<div>Loading...</div>}>
        <Posts search={search} page={page} group={group} />
      </Suspense>
    </main>
  );
};

export default Page;
