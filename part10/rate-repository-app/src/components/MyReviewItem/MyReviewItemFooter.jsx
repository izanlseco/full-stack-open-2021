import React from 'react';

import { Button } from '@ui-kitten/components';
import { Alert, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router';

import useDeleteReview from '../../hooks/useDeleteReview';

const MyReviewItemFooter = ({ review }) => {
  const [deleteReview] = useDeleteReview();
  let history = useHistory();

  const styles = StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      
    },
    footerControl: {
      marginHorizontal: 2,
    },
  });

  const deleteThis = async () => {
    let id = review.id;
    await deleteReview({ id });
  };

  const showAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteThis(),
        }
      ],
      {
        cancelable: true,
      }
    );
  
  return (
    <View style={styles.footerContainer}>
        <Button
          style={styles.footerControl}
          onPress={() => history.push(`/${review.repository.id}`)}
        >View repository</Button>
        <Button
          status='danger'
          style={styles.footerControl}
          onPress={showAlert}
        >
          Delete review
        </Button>
    </View>
  );
};

export default MyReviewItemFooter;