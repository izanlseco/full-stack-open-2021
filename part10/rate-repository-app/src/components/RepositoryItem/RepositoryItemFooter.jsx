import React from 'react';

import { View, StyleSheet } from 'react-native';

import Text from '../Text';

const RepositoryItemFooter = ({ repository }) => {
  const repoFooterStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 8
    }
  });

  const formatter = (number) => {
    return Math.abs(number) > 999 ? Math.sign(number) * ((Math.abs(number) / 1000).toFixed(1)) + 'k' : Math.sign(number) * Math.abs(number);
  };

  return (
    <View style={repoFooterStyles.container}>
      <View>
        <Text
          center
          fontWeight='bold'
        >
          {formatter(repository.stargazersCount)}
        </Text>
        <Text
          center
          color='textSecondary'
        >
          Stars
        </Text>
      </View>
      <View>
        <Text
          center
          fontWeight='bold'
        >
          {formatter(repository.forksCount)}
        </Text>
        <Text
          center color='textSecondary'>Forks</Text>
      </View>
      <View>
        <Text
          center
          fontWeight='bold'
        >
          {formatter(repository.reviewCount)}
        </Text>
        <Text center color='textSecondary'>Reviews</Text>
      </View>
      <View>
        <Text
          center
          fontWeight='bold'
        >
          {formatter(repository.ratingAverage)}
        </Text>
        <Text center color='textSecondary'>Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryItemFooter;