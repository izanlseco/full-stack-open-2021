import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import { useHistory, useParams } from 'react-router-native';

import useSelectedRepo from '../../hooks/useSelectedRepo';
import theme from '../../theme';
import RepositoryItemFooter from './RepositoryItemFooter';
import RepositoryItemHeader from './RepositoryItemHeader';
import RepositoryUrl from './RepositoryUrl';

const RepositoryItem = ({ repository }) => {
  let history = useHistory();
  let { id } = useParams();
  let {data, loading} = useSelectedRepo(id);

  if (loading) return null;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.backgroundRepoItem,
    },
    singleContainer: {
      backgroundColor: theme.colors.backgroundRepoItem,
      marginBottom: 10,
    },
  });

  const selectedRepo = (repository) => {
    history.push(`/${repository.id}`);
  };

  return (
    <Pressable onPress={() => selectedRepo(repository)}>
      <View style={id ? styles.singleContainer : styles.container}>
        <RepositoryItemHeader repository={data ? data.repository : repository} />
        <RepositoryItemFooter repository={data ? data.repository : repository} />
        {id ? <RepositoryUrl repository={data.repository} /> : null}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;