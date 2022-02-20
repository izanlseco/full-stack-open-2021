import { useMutation } from "@apollo/client";
import { useHistory } from 'react-router-native';

import { CREATE_REVIEW } from "../graphql/mutations/repositories";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  let history = useHistory();
  
  const createReview = async ({ repositoryName, ownerName, rating, review }) => {
    const { data } = await mutate({ variables: {
         repositoryName: repositoryName, ownerName: ownerName,
          rating: rating, text: review 
        }});
    history.push(`/${data.createReview.repositoryId}`);
  };
  return [createReview, result];
};

export default useCreateReview;