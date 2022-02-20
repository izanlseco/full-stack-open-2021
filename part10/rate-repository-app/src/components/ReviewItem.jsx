import React from 'react';

import { Card, Layout, Text } from '@ui-kitten/components';
import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';

import theme from '../theme';

const ReviewItem = ({ review }) => {
  const styles = StyleSheet.create({
    ratingContainer: {
      width: 30,
      height: 30,
      color: theme.colors.primary,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderRadius: 30 / 2,
    },
    headerContainer: {
      flexDirection: 'row',
    },
    card: {
      flex: 1,
    },
    leftContent: {
      margin: 5
    },
    rightContent: {
      marginLeft: 15
    },
    footerControl: {
      marginHorizontal: 2,
    },
  });

  const Header = () => {
    return (
      <Layout style={styles.headerContainer} level='1'>
        <View style={styles.leftContent}>
          <Text style={styles.ratingContainer}>{review.rating}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text category='h6'>{review.user.username}</Text>
          <Text category='s2' appearance='hint'>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        </View>
      </Layout>
    );
  };
  
  return (
    <Card style={styles.card} header={Header}>
      <Text category='p1'>
        {review.text}
      </Text>
    </Card>
  );
};

export default ReviewItem;