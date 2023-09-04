import exp from 'constants';

import { searchPosts } from './searchPosts';

type Params = Parameters<typeof searchPosts>[0] & { expectedTotal: number; expectedDataLength: number };

describe('Search Posts', () => {
  test.each`
    search | group     | page   | limit | expectedTotal | expectedDataLength
    ${''}  | ${''}     | ${1}   | ${10} | ${40}         | ${10}
    ${''}  | ${''}     | ${2}   | ${10} | ${40}         | ${10}
    ${''}  | ${''}     | ${124} | ${10} | ${40}         | ${0}
    ${''}  | ${'toys'} | ${1}   | ${10} | ${7}          | ${7}
    ${''}  | ${'toys'} | ${2}   | ${10} | ${7}          | ${0}
  `(
    'should return filtered data',
    async ({ search, group, page, limit, expectedTotal, expectedDataLength }: Params) => {
      const result = await searchPosts({ search, group, page, limit });
      const { data, total } = result;

      expect(total).toEqual(expectedTotal);
      expect(data.length).toEqual(expectedDataLength);
    },
  );
});
