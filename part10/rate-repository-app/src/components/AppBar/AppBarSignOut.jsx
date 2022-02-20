import React from 'react';

import { StyleSheet, Pressable } from 'react-native';

import useSignOut from '../../hooks/useSignOut';
import theme from '../../theme';
import Text from '../Text';

const AppBarSignOut = () => {
  const signOut = useSignOut();
  const styles = StyleSheet.create({
    tab: {
      color: theme.colors.textAppbar,
      fontWeight: theme.fontWeights.bold,
      fontFamily: theme.fonts.main,
      marginLeft: 10,
    }
  });

  return (
    <Pressable onPress={signOut}>
      <Text style={styles.tab}>
        Sign out
      </Text>
    </Pressable>
  );
};

export default AppBarSignOut;