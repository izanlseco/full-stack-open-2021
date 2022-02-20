import React from 'react';

import { Formik } from 'formik';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import useSignIn from '../../../hooks/useSignIn';
import SignInForm from './SignInForm';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.
    string()
    .min(3, 'Username must be longer than 3.')
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required.')
});

const SignInFormHandler = () => {
  let history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignInFormHandler;