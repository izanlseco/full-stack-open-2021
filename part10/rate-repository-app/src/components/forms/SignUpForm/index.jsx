import React from 'react';

import { Button, Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import FormikTextInput from '../FormikTextInput';

const SignUpForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    button: {
      marginTop: 15
    }
  });
  
  return (
    <Card>
      <FormikTextInput
        label="Username"
        mode="outlined"
        name="username"
        placeholder="xxxx"
        testID="usernameField"
      />
      <FormikTextInput
        label="Password"
        mode="outlined"
        name="password"
        placeholder="secret-stash"
        secureTextEntry
        testID="passwordField"
      />
      <FormikTextInput
        label="Password confirmation"
        mode="outlined"
        name="passwordConfirmation"
        placeholder="secret-stash"
        secureTextEntry
        testID="passwordConfirmationField"
      />
      <Button
        style={styles.button}
        name='submit'
        onPress={onSubmit}
        testID="submitButton"
      >
        Sign up
      </Button>
    </Card>
  );
};

export default SignUpForm;