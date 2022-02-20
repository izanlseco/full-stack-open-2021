import React from 'react';

import { Button, Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import FormikTextInput from '../FormikTextInput';

const CreateReviewForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    button: {
      marginTop: 15
    }
  });
  return (
    <Card>
        <FormikTextInput
          label="Name"
          mode="outlined"
          name="repositoryName"
          placeholder="Repository name"
          testID="repositoryNameField"
        />
        <FormikTextInput
          label="Owner"
          mode="outlined"
          name="ownerName"
          placeholder="Repository owner name"
          testID="ownerNameField"
        />
        <FormikTextInput
          label="Rating"
          mode="outlined"
          name="rating"
          placeholder="Rating between 0 and 100"
          keyboardType={'numeric'}
          testID="ratingField"
        />
        <FormikTextInput
          label="Review"
          mode="outlined"
          name="review"
          placeholder="Review"
          multiline
          testID="reviewField"
        />
      <Button
        style={styles.button}
        name='submit'
        onPress={onSubmit}
        testID="submitButton"
      >
        Create review
      </Button>
    </Card>
  );
};

export default CreateReviewForm;