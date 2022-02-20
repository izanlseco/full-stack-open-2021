import React from 'react';

import { StyleSheet, Text } from 'react-native';

import theme from '../../theme';

const AppBarMyReviews = () => {
  const styles = StyleSheet.create({
    repo: {
      color: theme.colors.textAppbar,
      fontWeight: theme.fontWeights.bold,
      fontFamily: theme.fonts.main,
      marginLeft: 10
    }
  });

  return (
    <>
      <Text style={styles.repo}>My reviews</Text>
    </>
  );
};

export default AppBarMyReviews;