import { useQuery } from "@apollo/client";

import { IS_AUTHORIZED } from '../graphql/queries/users';

const useGetMyReviews = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(IS_AUTHORIZED, {
    fetchPolicy: 'cache-and-network',
    ...variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  return {
    myReviews: data?.authorizedUser.reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useGetMyReviews;