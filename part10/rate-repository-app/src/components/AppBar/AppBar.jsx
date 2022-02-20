import React from 'react';

import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import { IS_AUTHORIZED } from '../../graphql/queries/users';
import theme from '../../theme';
import AppBarCreateReview from './AppBarCreateReview';
import AppBarMyReviews from './AppBarMyReviews';
import AppBarRepo from './AppBarRepo';
import AppBarSignIn from './AppBarSignIn';
import AppBarSignOut from './AppBarSignOut';
import AppBarSignUp from './AppBarSignUp';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: theme.colors.backgroundAppBar,
  }
});

const AppBar = () => {
  const { data } = useQuery(IS_AUTHORIZED);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarRepo />
        </Link>
        {
          data !== undefined && data.authorizedUser
          ? <>
              <Link to="/create-review">
                <AppBarCreateReview />
              </Link>
              <Link to="/my-reviews">
                <AppBarMyReviews />
              </Link>
              <AppBarSignOut/>
            </>
          : <>
              <Link to="/login">
                <AppBarSignIn />
              </Link>
              <Link to="/create-user">
                <AppBarSignUp/>
              </Link>
            </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;