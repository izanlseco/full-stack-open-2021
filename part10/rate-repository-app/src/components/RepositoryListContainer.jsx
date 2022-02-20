import React from 'react';

import { Button, Card, Divider, Input, Modal, Text } from '@ui-kitten/components';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';

import theme from '../theme';
import RepositoryItem from './RepositoryItem';


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundRepoList
  },
  item: {
    backgroundColor: 'white'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <>
        <Input
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={props.setSearchQuery}
          value={props.searchQuery}
        />
        <View>
          <Button appearance='ghost' onPress={() => props.setVisible(true)}>
            Order by
          </Button>

          <Modal
            visible={props.visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => props.setVisible(false)}>
            <Card>
              <Pressable onPress={() => {
                  props.setVisible(false);
                  props.setOrderBy(['CREATED_AT', 'DESC']);
                }
              }>
                <Text>Latest</Text>
              </Pressable>
              <Pressable onPress={() => {
                  props.setVisible(false);
                  props.setOrderBy(['RATING_AVERAGE', 'DESC']);
                }}>
                <Text>Highest rated</Text>
              </Pressable>
              <Pressable onPress={() => {
                  props.setVisible(false);
                  props.setOrderBy(['RATING_AVERAGE', 'ASC']);
                }}>
                <Text>Lowest rated</Text>
              </Pressable>
            </Card>
          </Modal>
        </View>
      </>
    );
  };

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        style={styles.container}
        data={repositoryNodes}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => <RepositoryItem
            style={styles.item}
            repository={item}
          />
        }
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;