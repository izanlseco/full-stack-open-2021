import React from 'react';

import { StyleSheet, View, Image } from 'react-native';

import theme from '../../theme';
import Text from '../Text';

const RepositoryItemHeader = ({ repository }) => {
  const repoHeaderStyles = StyleSheet.create({
    container: {
      flexDirection: 'row'
    },
    avatarContainer: {
      flexGrow: 1,
      paddingRight: 15,
    },
    infoContainer: {
      flexGrow: 1,
      marginTop: 10,
      marginRight: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      margin: 15,
      borderRadius: 15 / 2
    },
    languageContainer: {
      backgroundColor: theme.colors.primary,
      alignContent: 'center',
      marginTop: 5,
      marginRight: 300,
      borderRadius: 5 / 2,
    },
    language: {
      color: 'white',
      marginVertical: 3,
      marginHorizontal: 3
    }
  });

  return (
    <View style={repoHeaderStyles.container}>
      <View styles={repoHeaderStyles.avatarContainer}>
        <Image
          style={repoHeaderStyles.avatar}
          source={{
            uri: `${repository.ownerAvatarUrl}`
          }}
        />
      </View>
      <View style={repoHeaderStyles.infoContainer}>
        <Text
          fontWeight='bold'
          fontSize='subheading'
        >
          {repository.fullName}
        </Text>
        <Text
          color='textSecondary'
        >
          {repository.description}
        </Text>
        <View style={repoHeaderStyles.languageContainer}>
          <Text
            style={repoHeaderStyles.language}
          >
            {repository.language}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItemHeader;