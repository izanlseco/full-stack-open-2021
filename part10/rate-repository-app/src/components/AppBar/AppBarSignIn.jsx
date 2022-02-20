import React from 'react';

import { StyleSheet } from 'react-native';

import theme from '../../theme';
import Text from '../Text';

const AppBarSignIn = () => {
  const styles = StyleSheet.create({
    tab: {
      color: theme.colors.textAppbar,
      fontWeight: theme.fontWeights.bold,
      fontFamily: theme.fonts.main,
      marginLeft: 10,
    }
  });
  return (
    <Text style={styles.tab}>Sign in</Text>
  );
};

export default AppBarSignIn;