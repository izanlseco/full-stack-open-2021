import React, { useState } from 'react';

import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(['CREATED_AT', 'DESC']);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);
  const [visible, setVisible] = useState(false);
  const { repositories, fetchMore, loading } = useRepositories({
    variables: { searchKeyword, orderBy: orderBy[0], orderDirection: orderBy[1], first: 8, } 
  });

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) return null;

  return <RepositoryListContainer
    repositories={repositories}
    setOrderBy={setOrderBy}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    visible={visible}
    setVisible={setVisible}
    onEndReach={onEndReach}
  />;
};

export default RepositoryList;