import React, { useState, useEffect } from 'react';
import { ScrollView, Linking } from 'react-native';
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

export default function BookDetails({ route }) {
  const { slug, url } = route.params;

  const [book, setBook] = useState(null);

  function openBook() {
    Linking.openURL(url);
  }

  function _serializeBook({ book }) {
    const categories = book.bookCategory.map(({ category }) => category.name);
    const themes = book.bookTheme.map(({ theme }) => theme.name);
    const characteristics = book.bookCharacteristic.map(
      ({ characteristic }) => characteristic.name
    );

    return {
      title: book.name,
      author: book.author,
      sinopse: book.description,
      image: book.imageUrlIntermediaria,
      edition: book.edition,
      language: book.language,
      publisher: book.publisher.name,
      categories,
      themes,
      characteristics,
    };
  }

  useEffect(() => {
    async function _loadBook() {
      const { data } = await api.get(`books/${slug}`);
      const serializedBook = _serializeBook(data);
      console.log(serializedBook);
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
                <InfoText>{book.edition || 'Única'}</InfoText>
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
            <InfoText>{languages[book.language] || book.language}</InfoText>
          </InfoBox>
          <InfoBox>
            <Description>Categorias:</Description>
            <InfoText>{book.categories.join(' - ')}</InfoText>
          </InfoBox>
          <InfoBox>
            <Description>Temáticas:</Description>
            <InfoText>{book.themes.join(' - ')}</InfoText>
          </InfoBox>
          <InfoBox>
            <Description>Características:</Description>
            <InfoText>{book.characteristics.join(' - ')}</InfoText>
          </InfoBox>
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
