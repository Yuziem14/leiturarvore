import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import {
  Container,
  Main,
  Panel,
  ImageWrapper,
  CoverImage,
  BasicInfo,
  Title,
  InfoBox,
  InfoEnd,
  Description,
  InfoText,
  InfoSeparator,
  Actions,
  Button,
  ButtonText,
  Separator,
} from './styles';
import Header from '../../components/Header';
import AppLoading from '../../components/AppLoading';

import api from '../../services/api';

const languages = {
  por: 'Português',
  en: 'Inglês',
};

export default function BookDetails({ route, navigation }) {
  const { slug, url } = route.params;

  const [book, setBook] = useState(null);

  function openBook() {
    navigation.navigate('Read', { url });
  }

  function _serializeBook({ book }) {
    let categories = null;
    let themes = null;
    let characteristics = null;

    if (!url) {
      categories = book.bookCategory.map(({ category }) => category.name);
      themes = book.bookTheme.map(({ theme }) => theme.name);
      characteristics = book.bookCharacteristic.map(
        ({ characteristic }) => characteristic.name
      );
    } else {
      categories = book.categories;
      themes = book.themes;
      characteristics = book.characteristics;
    }

    return {
      title: book.name,
      author: book.author,
      sinopse: book.description,
      image: book.imageUrlIntermediaria,
      edition: book.edition || 'Única',
      language: languages[book.language] || book.language,
      publisher: book.publisher.name,
      categories: categories.join(' - '),
      themes: themes.join(' - '),
      characteristics: characteristics.join(' - '),
    };
  }

  useEffect(() => {
    async function _loadBook() {
      const { data } = await api.get(`books/${slug}`);
      const serializedBook = _serializeBook(data);
      setBook(serializedBook);
    }

    _loadBook();
  }, [slug]);

  if (!book) return <AppLoading />;

  return (
    <Container>
      <Header />
      <Main>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Panel>
            <ImageWrapper>
              <CoverImage
                resizeMode={'cover'}
                source={{
                  uri: book.image,
                }}
              />
            </ImageWrapper>
            <BasicInfo>
              <Title>{book.title}</Title>
              <InfoBox>
                <Description>Autor(a):</Description>
                <InfoText>{book.author}</InfoText>
              </InfoBox>
              <InfoSeparator>-</InfoSeparator>
              <InfoBox>
                <Description>Editora:</Description>
                <InfoText>{book.publisher}</InfoText>
              </InfoBox>
              <InfoSeparator>-</InfoSeparator>
              <InfoBox>
                <Description>Edição:</Description>
                <InfoText>{book.edition}</InfoText>
              </InfoBox>
            </BasicInfo>
          </Panel>
          <InfoBox>
            <Description>Sinopse:</Description>
            <InfoText>{book.sinopse}</InfoText>
          </InfoBox>
          <Separator />
          <InfoBox>
            <Description>Idioma:</Description>
            <InfoText>{book.language}</InfoText>
          </InfoBox>
          <InfoBox>
            <Description>Categorias:</Description>
            <InfoText>{book.categories}</InfoText>
          </InfoBox>
          <InfoBox>
            <Description>Temáticas:</Description>
            <InfoText>{book.themes}</InfoText>
          </InfoBox>
          <InfoBox>
            <Description>Características:</Description>
            <InfoText>{book.characteristics}</InfoText>
          </InfoBox>
          <InfoEnd />
          {url && (
            <Actions>
              <Button onPress={() => openBook(url)}>
                <FontAwesome5 name="readme" size={24} color="#fff" />
                <ButtonText>Ler</ButtonText>
              </Button>
              <Button>
                <Feather name="download" size={24} color="#fff" />
                <ButtonText>Download</ButtonText>
              </Button>
            </Actions>
          )}
        </ScrollView>
      </Main>
    </Container>
  );
}
