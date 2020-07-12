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
import api from '../../../services/api';

export default function Categories({ navigation }) {
  const [categories, setCategories] = useState([]);

  function handleSelectedCategory(category) {
    navigation.navigate('Results', { category });
  }

  useEffect(() => {
    api.get('categories').then(({ data }) => {
      setCategories(data.categories);
    });
  }, [categories]);

  return (
    <Container>
      <Header showLogo={false}>
        <Title>Categorias</Title>
      </Header>
      <Main>
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
      </Main>
    </Container>
  );
}
