import React from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';

import useGetReviews from '../hooks/useGetReviews';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const SingleRepository = ({ repository }) => {
  let { id } = useParams();
  const { reviews, fetchMore, loading } = useGetReviews({
    variables: { id, first: 8}
  });

  if (loading) return null;

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  const styles = StyleSheet.create({
    separator: {
      height: 10,
    }
  });

  const ItemSeparator = () => <View style={styles.separator} />;

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList 
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryItem repository={repository} />}
      onEndReached={onEndReach}
    />
  );
};

export default SingleRepository;