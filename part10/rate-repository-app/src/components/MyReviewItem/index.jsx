import React from 'react';

import { Card, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import MyReviewItemFooter from './MyReviewItemFooter';
import MyReviewItemHeader from './MyReviewItemHeader';

const MyReviewItem = ({ review }) => {
  const styles = StyleSheet.create({
    card: {
      flex: 1,
    }
  });

  const header = () => <MyReviewItemHeader review={review} />;

  const footer = () => <MyReviewItemFooter review={review} />;

  return (
    <Card style={styles.card} header={header} footer={footer}>
      <Text category='p1'>
        {review.text}
      </Text>
    </Card>
  );
};

export default MyReviewItem;