import React from 'react';

import { Layout, Text } from '@ui-kitten/components';
import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';

import theme from '../../theme';

const MyReviewItemHeader = ({ review }) => {
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

  return (
    <Layout style={styles.headerContainer} level='1'>
      <View style={styles.leftContent}>
        <Text style={styles.ratingContainer}>{review.rating}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text category='h6'>{review.repository.id}</Text>
        <Text category='s2' appearance='hint'>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
      </View>
    </Layout>
  );
};

export default MyReviewItemHeader;