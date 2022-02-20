import React from 'react';

import { Text, StyleSheet } from 'react-native';

import theme from '../../theme';

const AppBarSignUp = () => {
  const styles = StyleSheet.create({
    repo: {
      color: theme.colors.textAppbar,
      fontWeight: theme.fontWeights.bold,
      fontFamily: theme.fonts.main,
      marginLeft: 10
    }
  });
  return (
    <Text style={styles.repo}>Sign up</Text>
  );
};

export default AppBarSignUp;