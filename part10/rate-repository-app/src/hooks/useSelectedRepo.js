import { useQuery } from '@apollo/client';
import { SELECTED_REPO } from '../graphql/queries/repositories';

const useSelectedRepo = (id) => {
  const { data, error, loading } = useQuery(SELECTED_REPO, {
    variables: { id }
  });

  return { data, loading };
};

export default useSelectedRepo;