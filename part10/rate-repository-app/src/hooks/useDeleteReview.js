import { useMutation } from "@apollo/client";

import { DELETE_REVIEW } from "../graphql/mutations/repositories";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  
  const deleteReview = async (variables) => {
    console.log(variables);
    await mutate({
      variables: {
      ...variables
    }});
  };
  return [deleteReview, result];
};

export default useDeleteReview;