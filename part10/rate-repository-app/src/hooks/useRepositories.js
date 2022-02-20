import { useQuery } from '@apollo/client';

import { REPOSITORIES } from '../graphql/queries/repositories';

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    ...variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  return { 
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepositories;