import { useMutation } from "@apollo/client";

import { CREATE_USER } from "../graphql/mutations/users";

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  
  const createUser = async ({ username, password }) => {
    await mutate({ variables: { username: username, password: password } });
  };
  return [createUser, result];
};

export default useCreateUser;