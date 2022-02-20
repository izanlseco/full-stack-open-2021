import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';

import useCreateReview from '../../../hooks/useCreateReview';
import CreateReviewForm from './';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repository name is required.'),
  ownerName: yup.
    string()
    .required('Repository owner\'s name is required'),
  rating: yup.
    number()
    .min(0, 'Rating must be longer than 0.')
    .max(100, 'Rating can\'t be higher than 100.')
    .required('Rating is required'),
  review: yup.
    string(),
});

const CreateReviewFormHandler = () => {

  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    let { repositoryName, ownerName, rating, review } = values;
    try {
      rating = parseInt(rating);
      await createReview({ repositoryName, ownerName, rating, review });
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
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReviewFormHandler;