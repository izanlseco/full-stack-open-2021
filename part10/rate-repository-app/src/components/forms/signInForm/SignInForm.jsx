import React from 'react';

import { Button, Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import FormikTextInput from '../FormikTextInput';

const SignInForm = ({ onSubmit }) => {
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
      <Button
        style={styles.button}
        name='submit'
        onPress={onSubmit}
        testID="submitButton"
      >
        Login
      </Button>
    </Card>
  );
};

export default SignInForm;