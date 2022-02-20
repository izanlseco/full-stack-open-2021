import React from 'react';

import { Text, StyleSheet } from 'react-native';

import theme from '../../theme';

const AppBarRepo = () => {
  const styles = StyleSheet.create({
    repo: {
      color: theme.colors.textAppbar,
      fontWeight: theme.fontWeights.bold,
      fontFamily: theme.fonts.main,
    }
  });
  return (
    <Text style={styles.repo}>Repositories</Text>
  );
};

export default AppBarRepo;