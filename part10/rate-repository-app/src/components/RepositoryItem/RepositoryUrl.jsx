import React from 'react';

import { Button } from '@ui-kitten/components';
import * as Linking from 'expo-linking';
import { StyleSheet } from 'react-native';

import theme from '../../theme';

const RepositoryUrl = ({ repository }) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      margin: 10
    }
  });
  return (
    <Button
      style={styles.button}
      onPress={() => Linking.openURL(repository.url)}
    >
      Open in GitHub
    </Button>
  );
};

export default RepositoryUrl;