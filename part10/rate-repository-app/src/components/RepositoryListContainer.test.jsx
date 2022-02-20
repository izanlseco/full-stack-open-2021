import React from 'react';

import { render, cleanup } from '@testing-library/react-native';

import RepositoryListContainer from './RepositoryListContainer';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      const { getByText, getAllByText } = render(<RepositoryListContainer repositories={repositories} />);

      expect(getByText('jaredpalmer/formik')).toHaveTextContent('jaredpalmer/formik');
      expect(getByText('Build forms in React, without the tears')).toHaveTextContent('Build forms in React, without the tears');
      expect(getByText('TypeScript')).toHaveTextContent('TypeScript');
      expect(getByText('1.6k')).toHaveTextContent('1.6k');
      expect(getByText('21.9k')).toHaveTextContent('21.9k');
      expect(getByText('88')).toHaveTextContent('88');

      expect(getByText('async-library/react-async')).toHaveTextContent('async-library/react-async');
      expect(getByText('Flexible promise-based React data loader')).toHaveTextContent('Flexible promise-based React data loader');
      expect(getByText('JavaScript')).toHaveTextContent('JavaScript');
      expect(getByText('69')).toHaveTextContent('69');
      expect(getByText('1.8k')).toHaveTextContent('1.8k');
      expect(getByText('72')).toHaveTextContent('72');

      expect(getAllByText('3')[0]).toHaveTextContent('3');
      expect(getAllByText('3')[1]).toHaveTextContent('3');
    });
    afterEach(cleanup);
  });
});