import React from 'react';

import { Formik } from 'formik';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import useCreateUser from '../../../hooks/useCreateUser';
import useSignIn from '../../../hooks/useSignIn';
import SignUpForm from './';

const SignUpFormHandler = () => {
  let [createUser] = useCreateUser();
  let [signIn] = useSignIn();
  let history = useHistory();

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.
      string()
      .min(3, 'Username must be longer than 3.')
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required.'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords doesn\'t match')
      .required('Password confirmation is required')
  });

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({ username, password});
      await signIn({ username, password });
      history.push('/');
    } catch (e){
      console.log('error', e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUpFormHandler;