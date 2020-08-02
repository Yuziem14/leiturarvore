import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import {
  Container,
  Title,
  Main,
  CategoryContainer,
  CategoryName,
} from '../styles';

import Header from '../../../components/Header';
import OfflineMessage from '../../../components/OfflineMessage';
import * as categoriesApi from '../../../services/categories.api';
import { useOffline } from '../../../contexts/offline';

export default function Categories({ navigation }) {
  const { connection } = useOffline();
  const [categories, setCategories] = useState([]);

  function handleSelectedCategory(category) {
    navigation.navigate('Results', { category });
  }

  useEffect(() => {
    async function _loadCategories() {
      const data = await categoriesApi.fetchCategories();
      setCategories(data);
    }

    try {
      if (!connection.isInternetReachable) _loadCategories();
    } catch (err) {
      console.log('Error when loading categories: ', err);
    }
  }, [connection.isInternetReachable]);

  return (
    <Container>
      <Header showLogo={false}>
        <Title>Categorias</Title>
      </Header>
      <Main>
        {!connection.isInternetReachable ? (
          <OfflineMessage />
        ) : (
          <FlatList
            data={categories}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => (
              <CategoryContainer
                activeOpacity={0.8}
                onPress={() => handleSelectedCategory(item)}
              >
                <CategoryName>{item.name}</CategoryName>
              </CategoryContainer>
            )}
            keyExtractor={category => String(category.slug)}
          />
        )}
      </Main>
    </Container>
  );
}
