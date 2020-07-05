import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Header,
  Title,
  Main,
  CategoryContainer,
  CategoryName,
} from '../styles';
import api from '../../../services/api';

export default function Categories({ navigation }) {
  const [categories, setCategories] = useState([]);

  function handleSelectedCategory(category) {
    console.log(category);
    console.log(navigation);
    navigation.navigate('Results', { category });
  }

  useEffect(() => {
    api.get('categories').then(({ data }) => {
      setCategories(data.categories);
    });
  }, [categories]);

  return (
    <Container>
      <Header>
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
