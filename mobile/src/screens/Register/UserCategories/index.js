import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  Header,
  Title,
  SubTitle,
  CategoryContainer,
  CategoryView,
  Square,
  SelectedSquare,
  CategoryName,
  SignIn,
  ButtonText,
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../../services/api';

export default function UserCategories({ route, navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    api.get('categories').then(({ data }) => {
      setCategories(data.categories);
    });
  }, []);

  async function handleRegisterSubmit() {
    const { formData } = route.params;

    api
      .post('auth/register', { ...formData, categories: selectedCategories })
      .then(response => {
        console.log(response);
        navigation.navigate('Login');
      });
  }

  function handleCategorySelector(category) {
    const index = selectedCategories.findIndex(
      ({ slug }) => slug === category.slug
    );

    if (index < 0) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter(({ slug }) => slug !== category.slug)
      );
    }
  }

  return (
    <Container>
      <Header>
        <Title>Escolha o que mais lhe agrada.</Title>
        <SubTitle>
          Isso nos ajudará a recomendar livros do seu interesse.
        </SubTitle>
      </Header>
      <CategoryContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          {categories &&
            categories.map(({ name, slug }) => (
              <CategoryView
                key={slug}
                activeOpacity={0.9}
                onPress={() => handleCategorySelector({ name, slug })}
              >
                {selectedCategories.some(selected => selected.slug === slug) ? (
                  <SelectedSquare>
                    <MaterialIcons name="done" size={15} />
                  </SelectedSquare>
                ) : (
                  <Square />
                )}
                <CategoryName>{name}</CategoryName>
              </CategoryView>
            ))}

          <SignIn onPress={handleRegisterSubmit}>
            <MaterialIcons name="arrow-forward" size={30} color="#fff" />
            <ButtonText>Entrar</ButtonText>
          </SignIn>
        </ScrollView>
      </CategoryContainer>
    </Container>
  );
}
