import Image from 'next/image';
import { FC } from 'react';

import { Post } from '@/types';

const Post: FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="max-w-xs flex flex-col gap-y-2 rounded-md overflow-hidden drop-shadow-md bg-white cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1">
      <div className="flex gap-x-2 h-32 bg-cover" style={{ backgroundImage: `url(${post.imageUrl})` }} />
      <div className="flex flex-col flex-1 px-4">
        <p className="text-xs text-cyan-700/75 my-2">{post.categories.map((category) => category.name).join(' ')}</p>
        <h2 className="font-semibold mb-3 dark:text-black">{post.title}</h2>
        <p className="flex-1 text-sm text-gray-800/50 mb-4">{post.excerpt}</p>
        <div className="flex flex-row items-center mb-4">
          <div
            className="block bg-cover rounded-full w-10 h-10"
            style={{ backgroundImage: 'url(https://i.pinimg.com/564x/47/75/b0/4775b0b631bb0c5662860d3febdbab94.jpg' }}
          />
          <div className="flex flex-col ml-2 gap-1">
            <h3 className="text-xs font-semibold dark:text-black">Buster Scruggs</h3>
            <p className="text-xs text-gray-800/50">Jan 1, 2021 • 6 min read</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
