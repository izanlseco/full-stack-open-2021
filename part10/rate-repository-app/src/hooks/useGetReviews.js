import { useQuery } from '@apollo/client';
import { GET_REVIEWS_SELECTED_REPO } from '../graphql/queries/repositories';

const useGetReviews = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS_SELECTED_REPO, {
    fetchPolicy: 'cache-and-network',
    ...variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  return {
    reviews: data?.repository.reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useGetReviews;