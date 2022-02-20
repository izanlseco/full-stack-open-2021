import React from 'react';

import { Divider } from '@ui-kitten/components';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

import useGetMyReviews from '../hooks/useGetMyReviews';
import theme from '../theme';
import MyReviewItem from './MyReviewItem';

const MyReviewsList = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundRepoList
    },
    item: {
      backgroundColor: 'white'
    },
    menu: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10
    },
    searchBar: {
      margin: 15
    }
  });

  const { myReviews, loading } = useGetMyReviews({
    variables: { includeReviews: true }
  });

  if (loading) return null;

  const repositoryNodes = myReviews
    ? myReviews.edges.map(edge => edge.node)
    : [];


  return (
    <FlatList 
      style={styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={Divider}
      renderItem={({ item }) => <MyReviewItem
          style={styles.item}
          review={item}
        />
      }
    />
  );
};

export default MyReviewsList;