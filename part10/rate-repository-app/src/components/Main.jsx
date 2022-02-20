import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import theme from '../theme';
import AppBar from './AppBar/AppBar';
import CreateReviewFormHandler from './forms/CreateReviewForm/CreateReviewFormHandler';
import SignInFormHandler from './forms/signInForm/SignInFormHandler';
import SignUpFormHandler from './forms/SignUpForm/SignUpFormHandler';
import MyReviewsList from './MyReviewsList';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundMain
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/login" exact>
          <SignInFormHandler />
        </Route>
        <Route path="/create-review" exact>
          <CreateReviewFormHandler />
        </Route>
        <Route path="/create-user" exact>
          <SignUpFormHandler />
        </Route>
        <Route path="/my-reviews" exact>
          <MyReviewsList />
        </Route>
        <Route path="/:id" exact>
          <SingleRepository />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;